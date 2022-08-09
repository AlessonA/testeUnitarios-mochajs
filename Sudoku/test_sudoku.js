const assert = require("assert");

const { validColumn , validRow, flag, sudokuIsValid} = require("./sudoku");

const { boards } = require('./boards');
const { isArrayBuffer } = require("util/types");

boards.forEach(function (board, index) {
  describe("Sudoku", function () {
    describe("Coluna", function () {
      it(`board = ${index}`, function () {
        const result = validColumn(board,flag);
        assert.strictEqual(result, true);
      })
    });
    describe("Linha", function () {
      it(`board = ${index}`, function () {
        const result = validRow(board,flag);
        assert.strictEqual(result, true);
      })
    });
  });
  
});
describe('E2E',function(){
  it('codigo completo', function(){
    const result = sudokuIsValid(boards,flag);
    assert.strictEqual(result, '[{"board_2":false,"erro":"column"}]' )
  })
})

