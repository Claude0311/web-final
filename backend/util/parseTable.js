const getCor = require("./getCoordinate")

const getFloor = (floors) => {
    return {
        floor: parseInt(floors.split('~')[0]),
        maxFloor: parseInt(floors.split('/')[1])
    }
}

const getPrice = (price) => {
    return parseFloat(price.replace(',',''))*(price.includes('萬')?10000:price.includes('億')?100000000:1)||0
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
    const total = priceComp.getElementsByTagName('text')[0].textContent
    const totalPrice = getPrice(total)
    const parking = priceComp.textContent.match(/\(.*\)/g)
    const parkingPrice = parking===null?0:getPrice(parking[0].replace(/[(含車位)]/g,''))
    return {totalPrice,parkingPrice}
}
const getSpaceDetail = (space) => {
    const spaces = space.match(/[0-9.]+坪/g)
    const totalSpace = parseFloat(spaces[0])
    const parkingSpace = spaces[1]?parseFloat(spaces[1]):0
    return {totalSpace,parkingSpace}
}

module.exports = async (tds) => {
    const detail = {
        soldTime: parseInt(getText(tds,'.time span')),
        address: getAddress(getText(tds,'.add')),
        price: getPriceDetail(tds),
        space: getSpaceDetail(getText(tds,'.floorSpace')),
        floor: getFloor(getText(tds,'.floor')),
        age: parseFloat(getText(tds,'.age')),
        parkingSpace: getText(tds,'.parkingSpace')==='有'
    }
    const overview = {
        id: tds.getElementsByClassName('time')[0].id,
        buildingType: getText(tds,'.type'),
        coordinate: await getCor(detail.address),
        unitPrice: getPrice(getText(tds,'.unitPrice')),
    }
    return {
        overview,
        detail
    }
}