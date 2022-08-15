/*
    ## Realizar teste é uma parte fundamental no desenvolvimento de um software. Com utilização de ferramentas podemos
    podemos altomatizar esse processo, economizando bastante tempo.

    # Com a utilização de teste consitentes  apos escrever um novo codigo podemos garantir que as novas alterações não quebrem recursos
    pré-existentes.

    # Dando ao desenvolvedor confiança em sua base de código, especialmente quando ela é implementada para a produção.
    
    ## Mocha => Nesse teste usamos esse framework,sendo uma ferramenta popular para teste em JavaScript. Ele organiza nossos casos de teste 
    e executa-os para nós.
    
    # Mocha pussui uma grande quantidade de funcionalidade, o que fas dele um dos mais flexíveis. 

    ## assert (Node.js) => Como o Mocha não verifica o comportamento do nosso código, o usaremos para comparar valores em um teste.
    
    # Com a ajuda do framework para estruturar os teste o assert casará para criar os testes de fato, usando o Mocha como um
    construtor de planos e o assert para implementar o plano. 
*/

// para testarmos o codigo vamos importa ele nesse documento, usando o 'require'.
const Todos = require('../todos/checkList');

// o assert como é uma funcionalidade do Node.js também será chamado para podermos utilizar.
// .strict => nos permite usar testes de igualdade especiais recomentados pelo Node.js.
const assert = require('assert').strict;

// nosso codigo trabalha com a criação de um arquivo, chamaremos o File System (fs) para podermos utilizar sua funções.
/*
    # File System => Este módulo fornece operações de I/O (Input/Output ou E/S Entra/Saída) através de wrappers simples ao redor de funções
    POSIX.
    Ref : https://imasters.com.br/desenvolvimento/node-js-6-dicas-do-modulo-file-system#:~:text=js%20que%20%C3%A9%20o%20File,ao%20redor%20de%20fun%C3%A7%C3%B5es%20POSIX.
    Obs: esse módulo trabalhar como uma função assincrona.
*/ 
const fs = require('fs');

/*
    describe => é usada para agrupar testes semelhantes. Não é exigida pelo Mocha, mas com o agrupamento tora nosso codigo mais 
    fácil de ser mantido como boa pratica, também torna fácil a atualização dos testes que são semelhantes de uma só vez. 
*/
describe("integration test", function () {
    /*
        it => é usado para teste individual, deve ser escrito como se você estivesse dizendo: Deve ser iagual ou Deve fazer login ...
        Nele contem nosso código de teste.
    */
    it("should be able to add and complete TODOs", function () {
        let todos = new Todos();
        
        // strictEqual() espera igualdade entre o argumento real (o que é passado no primeiro argumento) e o esperado (o segundo argumento que é passado, o resultado que se espera obter)
        assert.strictEqual(todos.list().length, 0);

        todos.add("run code");
        assert.strictEqual(todos.list().length, 1);

        /*
            deepStrictEqual() =>  essa função testa recursivamente se nossos objetos esperados e real possuem as mesma propriedades.
            testando assim se ambas as matrizes possuem um objeto JS, depois se verifica se seu conteudo são iguais.
        */
        assert.deepStrictEqual(todos.list(), [{ title: "run code", completed: false }]);

        todos.add("test everything");
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: false },
                { title: "test everything", completed: false }
            ]
        );

        todos.complete("run code");
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: true },
                { title: "test everything", completed: false }
            ]
        );
    });
});


describe("complete()", function () {
    it("should fail if there are no TODOs", function () {
        let todos = new Todos();
        const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

        /*
            throws() => faz parte do módulo assert
            Essa função foi criada para que possamos verificar os erros que são emitidos em nosso codigo.
            Seu primeiro argumento é uma função que contém o codigo que emite o erro, o segundo é o erro que estamos esperando.
        */
        assert.throws(() => {
            todos.complete("doesn't exist");
        }, expectedError);
    });
});
describe("saveToFile()", function () {
    // Hooks (ganchos) => são funcionalidade útil do Mocha que nos permite configurar o ambiente antes e após um teste.
    
    // este hooks é executado antes de todos os testes.
    beforeEach(function () {
        //usamos o beforeEach para instanciar um objeto que será usado em todos os casos de teste
        this.todos = new Todos();
        this.todos.add("save a CSV");
    });

    // este hooks é executado depois de todos os teste.
    afterEach(function () {
        //o afterEach esta lindo todas as alterção feita no codigo. verificando primeiro se o arquivo foi criado.
        if (fs.existsSync("todos.csv")) {
            fs.unlinkSync("todos.csv");
        }
    });

    // o 'this' será o mesmo para todos os casos de teste dentro do describe(). 

    /*
        ## funções assincronas => São funções que acessam ou buscam algum tipo de recurso em um dispositivo, nesse tipo de função 
        precisamos esperar que as respostas esteja disponível antes de executar a ação seguinte.

        # Escrever em um arquivo será uma operação assíncrona.

        # Callbacks => uma fnção callback é usada como um argumento para uma função assíncrona. Ela é chamada quando a operação é concluída.

        ####################################################################################################################################

        >   it("should save a single TODO", function(done) {
            let todos = new Todos();
            todos.add("save a CSV");
            todos.saveToFile((err) => {
                assert.strictEqual(fs.existsSync('todos.csv'), true);
                let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
                let content = fs.readFileSync("todos.csv").toString();
                assert.strictEqual(content, expectedFileContents);
                done(err);
            });
        });

            # Normalmente as funções it() a função callback que usamos não tem argumentos. Desta vez temos o 'done' como argumento.
            # Precisamos desse argumento ao testar as funções com callbacks. Essa função 'done()' é usada pelo Mocha para dizer a ele quando
            uma função assincrona é concluida.
            
        ####################################################################################################################################
        >   it("should save a single TODO", function() {
            let todos = new Todos();
            todos.add("save a CSV");
            return todos.saveToFile().then(() => {
                assert.strictEqual(fs.existsSync('todos.csv'), true);
                let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
                let content = fs.readFileSync("todos.csv").toString();
                assert.strictEqual(content, expectedFileContents);
            });
        });

            # No arquivo do codigo foi acrescentado um promise : const fs = require('fs').promises; 
                > Promise é um objeto usado para processamento assíncrono. Promise ('promessa') representa um valor que pode estar disponível agora ou no futuro.
            # Para testar nossa promessa precisamos colocar no codigo de asserção na função then()
            # Ao testar uma Promessa é nescessário usar o return caso contrário, existe o risco de se obter um falso positivo.
            # Foi omitido no codigo a cláusula catch(), o MOcha pode detectar quando uma promessa é rejeitada, assim reprovando automaticamente o teste. 

    */
        // esse codigo usamos o async/await
        // async indica que é uma função assincrona, o await é usado junto dela, ele diz que deve se esperar (await) a resposta.
    it("should save a single TODO without error", async function () {
        // o this está se referenciando ao mesmo objeto dentro do beforeEach().
        await this.todos.saveToFile()

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);

    });
    
    it("should save a single TODO that's completed", async function () {
        this.todos.complete("save a CSV")
        await this.todos.saveToFile();

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,true\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });

});