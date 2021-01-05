import getCor from './getCoordinate.js'

const getFloor = (floors) => {
    const [first,second] = floors.split('/')[0].split('~')
    const maxFloor = parseInt(floors.split('/')[1])
    if(first!==second) return{floor: -1,maxFloor}
    return {
        floor: parseInt(first),
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
    const priceComp = tds.querySelector('.info-price')
    const total = priceComp.getElementsByTagName('text')[0].textContent
    const totalPrice = getPrice(total)
    const parking = priceComp.getElementsByClassName('notice')
    const parkingPrice = parking===null?0:getPrice(parking[0].textContent.replace(/[(含車位)]/g,''))
    return {totalPrice,parkingPrice}
}
const getSpaceDetail = (space) => {
    const spaces = space.match(/[0-9.]+坪/g)
    const totalSpace = parseFloat(spaces[0])
    const parkingSpace = spaces[1]?parseFloat(spaces[1]):0
    return {totalSpace,parkingSpace}
}

export default async (tds) => {
    const detail = {
        soldTime: parseInt(getText(tds,'.info-deal-date')),
        address: getAddress(getText(tds,'.info-address')),
        price: getPriceDetail(tds),
        space: getSpaceDetail(getText(tds,'.info-pin')),
        floor: getFloor(getText(tds,'.info-floor')),
        age: parseFloat(getText(tds,'.info-year')),
        parkingSpace: getText(tds,'.info-price .notice')!==''//this is gone
    }
    console.log({detail})
    const overview = {
        id: tds.getElementsByClassName('info-deal-date')[0].id,
        buildingType: getText(tds,'.info-type'),
        coordinate: await getCor(detail.address),
        unitPrice: getPrice(getText(tds,'.info-pin-price')),
    }
    console.log({overview})
    return {
        overview,
        detail
    }
}