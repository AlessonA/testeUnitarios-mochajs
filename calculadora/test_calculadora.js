const Calcular = require('./calculadora');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

/*
    # Nesse teste foi aplicado usando a comparação, usando chai e o assert do Node.
    # Estou usando nesse teste o expect da biblioteca do chai.

*/

describe('Calcular > devolve um numero e verifica se é um numero', function () {
    beforeEach(function () {
        this.calc = new Calcular();
        
    });
    
     /*
        # Estou usando orientação a objeto para poder testar varias funções, aplicando assim teste unitarios.
        Por isso da utilização do 'this' e 'new' 
    */

    it('somar() retorno é um numero /chai/', function () {
        expect(this.calc.somar(1, 3)).to.be.a('number');
    })

    it('somar() retorno é um numero /assert/', function () {
        assert.equal(typeof this.calc.somar(1,3),'number')
    })

    it('somar() > throw new Error() > "Um dos valores não é um numero" o /chai/', function () {
        expect(() => { 
            this.calc.somar() 
        }).to.throw(Error, "Um dos valores não é um numero")
    })

    it('somar() > throw new Error() > "Um dos valores não é um numero" o /assert/', function () {
        expectedError = new Error("Um dos valores não é um numero")
        assert.throws(() => {
            this.calc.somar(1, "e")
        }, expectedError)
    })
})

describe('Resultados da funções', () => {
    beforeEach(function(){
        this.calcular = new Calcular();
    })
        // With 'for' it is creating random numbers from 0 to 10
    for(i=0;i<3;i++){
        // Math.random generates number from 0 to 1, to increase the values i'm multiplying by 10
        num01 = Math.floor(Math.random() * 10)
        // Math.floor convert real numbers to integers
        num02 = Math.floor(Math.random() * 10)

        num01 =  num01 === 0 ? 1 : num01;
        num02 = num02 === 0 ? 1 : num02;

        it(`somar() entradas: ${num01} , ${num02}`, function(){
            //usando o expect do Chai
            expect(this.calcular.somar(num01,num02)).to.equal(num01+num02)
            //usando o assert do Node
            assert.equal(this.calcular.somar(num01,num02),num01+num02)
        })
        it(`subtracao() entradas: ${num01} , ${num02}`, function(){
            //usando o expect do Chai
            expect(this.calcular.subtracao(num01,num02)).to.equal(num01-num02)
            //usando o assert do Node
            assert.equal(this.calcular.subtracao(num01,num02),num01-num02)    
        })
        it(`multiplicacao() entradas: ${num01} , ${num02}`, function(){
            //usando o expect do Chai
            expect(this.calcular.multiplicacao(num01,num02)).to.equal(num01*num02)
            //usando o assert do Node
            assert.equal(this.calcular.multiplicacao(num01,num02),num01*num02)    
        })
        it(`divisao() entradas: ${num01} , ${num02}`, function(){
            //usando o expect do Chai
            expect(this.calcular.divisao(num01,num02)).to.equal(num01/num02)
            //usando o assert do Node
            assert.equal(this.calcular.divisao(num01,num02),num01/num02)    
        })
    }

    it('divisao(),daParaCalcular() > deve emetir um erro se tiver uma divisão por 0',function(){
        // throw receives with first argument an Error funtion or method, the second argument is the expected response
        expect(() =>{
            this.calcular.daParaCalcular(0,0)
        }).to.throw(Error,'Não é possivél dividir por 0')
        assert.throws(() =>{
            this.calcular.divisao(3,0)
        },new Error('Não é possivél dividir por 0'))
    })
})