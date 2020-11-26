const getFloor = (floors) => {
    return {
        floor: parseInt(floors.split('~')[0]),
        maxFloor: parseInt(floors.split('/')[1])
    }
}

const getPrice = (price) => {
    return parseFloat(price)*10000
}

const getAddress = (add) => {
    const reg = /永和區.*號/g
    const output = add.match(reg)
    return output?output[0]:''
}

const getText = (element, selector) => {
    return element.querySelector(selector).textContent.trim()
}

const getPriceDetail = (tds) => {
    const priceComp = tds.querySelector('.dealPrice')
    console.log(priceComp)
    const total = priceComp.getElementsByTagName('text')[0].textContent.replace(',','')
    const totalPrcie = parseFloat(total)*(total.includes('億')?100000000:10000)
    return totalPrcie
}

module.exports = (tds) => {
    const overview = {
        buildingType: getText(tds,'.type'),
        coordinate: {lat:'',lon:''},
        unitPrice: getPrice(getText(tds,'.unitPrice')),
    }
    const detail = {
        soldTime: parseInt(getText(tds,'.time span')),
        address: getAddress(getText(tds,'.add')),
        price: getPriceDetail(tds),
        space: '',
        floor: getFloor(getText(tds,'.floor')),
        age: parseFloat(getText(tds,'.age')),
        parkingSpace: getText(tds,'.parkingSpace')==='有'
    }
    return {
        overview,
        detail
    }
}