const { dates } = require('./cases');

const validDate = (dataFor) => {
    let dataFormat = [2, 2, 4]
    let flag = true
    for (let index = 0; index < dataFor.length; index++) {
        if (dataFor[index].length !== dataFormat[index]) {
            flag = false
            break;
        }
    }
    return flag
}

const isArr = (dataDate) => {
    if (Array.isArray(dataDate)) return true
    else return false
}

const dataIsNumber = (dtaNum) => {
    flag = true
    for(value of dtaNum){
        if(isNaN(value)){
            flag = false
            break;
        }
    }
    return flag
}

function date(date) {
    let array = date
    let dataInvertida = []
    if (isArr(array)) {
        for (i = 0; i < array.length; i++) {
            data = array[i];
            if (validDate(data.split(/[\/|\-| ]+/)) && dataIsNumber(data.split(/[\/|\-| ]+/))) {
                dataInvertida.push(data.split(/[\/|\-| ]+/).reverse().join('-'));
            } else {
                dataInvertida.push(`essa data está incorreta ${data}`)
            }
        }
    }
    return dataInvertida;
}

module.exports = { date, validDate, isArr , dataIsNumber}