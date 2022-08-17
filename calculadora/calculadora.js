class Calcular {
    constructor (){
        this.title = 'Calculadora'
    }
    somar(num_01,num_02){
        this.daParaCalcular(num_01,num_02)
        return num_01 + num_02
    }
    subtracao(num_01,num_02){
        this.daParaCalcular(num_01,num_02)
        return num_01 - num_02
    }
    multiplicacao(num_01,num_02){
        this.daParaCalcular(num_01,num_02)
        return num_01*num_02
    }
    divisao(num_01,num_02){
        this.daParaCalcular(num_01,num_02)
        return num_01/num_02
    }
    daParaCalcular(num_01,num_02){
        if(isNaN(num_01*num_02)) {
            throw new Error('Um dos valores não é um numero')
        }
        if(!isFinite(num_01/num_02)){
            throw new Error('Não é possivél dividir por 0')
        }
    }
};

module.exports = Calcular;

