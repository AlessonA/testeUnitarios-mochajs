let flag = true
const { boards } = require('./boards')

const validRow = (t, f) => {
    for (let linha = 0; linha < t.length; linha++) {
        for (let value = 0; value < t[linha].length; value++) {
            if (t[linha][value] !== '.') {
                for (let exists = 0; exists < t[linha].length; exists++) {
                    if (value !== exists) {
                        if (t[linha][exists] !== '.') {
                            if (t[linha][value] == t[linha][exists]) f = false
                        }
                    }
                }
            }
            if (!f) break;
        }
        if (!f) break;
    }
    return f
}

const validColumn = (tab, fl) => {
        for (let column = 0; column < tab.length; column++) {
            let col = tab.map(post => post[column])
            for (let val = 0; val < col.length; val++) {
                if (col[val] !== '.') {
                    for (let exis = 0; exis < col.length; exis++) {
                        if (val !== exis) {
                            if (col[val] == col[exis]) {
                                fl = false
                                break;
                            }
                        }
                    }
                }
                if (!fl) break;
            }
            if (!fl) break;
        }
    return fl
}

function sudokuIsValid(table, flag) {
    // verifica cada tabuleiro
    let validArray = []

    for (const index in table) {
        if (!validRow(table[index], flag)) {
            validArray.push({
            [`board_${index}`]: validRow(table[index], flag),
            'erro': 'Row'
            }
            )
        }
        if (!validColumn(table[index], flag)) {
            validArray.push({
            [`board_${index}`] : validColumn(table[index], flag),
            'erro' : 'column',
            }
            )
        }
    }
    return(JSON.stringify(validArray))
    // retorna se é possivel a finalização do tabuleiro de sudoku
    // if (flag) return 'Esse tabuleiro é possível ser concluido'
    // else return 'O tabuleiro possui algum elemento repetido, não é possivel finalizar'
}

//console.log(sudokuIsValid(boards, flag))
module.exports = { validColumn, validRow, flag, sudokuIsValid}