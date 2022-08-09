var assert = require('assert');
const { dates } = require('../FormartarData/cases');
const { date, validDate, isArr , dataIsNumber} = require('../FormartarData/formatDate')

describe('Conferir data passo a passo', function () {

    describe('element is array', function () {
        const valid = isArr(dates[1])
        it(`input: ${dates[0]} expect: Array`, function () {
            assert.equal(valid, true)
        })
    })
    dates[1].forEach(function (value) {
        describe('date is correct', function () {
            const valid = validDate(value.split(/[\/|\-| ]+/))
            it(`input: ${value} expect: dd/mm/yyyy`, function () {
                assert.equal(valid, true)
            })
        })
    })
    dates[1].forEach(function (value) {
        describe('date is correct', function () {
            const valid = dataIsNumber(value.split(/[\/|\-| ]+/))
            it(`input: ${value} expect: Number`, function () {
                assert.equal(valid, true)
            })
        })
    })
})
describe('Validação da API completa',function(){
    dates[2].forEach(function (value, index) {
        describe('data format from dd/mm/yyyy to yyyy/mm/dd', function () {
            const data = date(dates[1])
            it(`input: ${dates[1][index]} expect: ${value}`, function () {
                assert.equal(data[index], value, `formato devolvido errado`)
            })
        })
    })
})
