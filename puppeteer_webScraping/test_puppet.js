const assert = require('assert');

const isArrPromo = (promoList) => {
    describe('coletas as promoções da Shoppe', function () {
        it('devolve um objeto JSON', function () {
            assert.equal(isArray(promoList), true)
        })
    })
}

module.exports = { isArrPromo }