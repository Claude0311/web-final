const axios = require('axios')
// const fs = require('fs')
const {JSDOM} = require('jsdom')
// const jquery = require('jquery')
const House = require('../model/house')

module.exports = async (fromWeb=false)=>{
    if(fromWeb){
        const ans = await axios.get('https://evertrust.yungching.com.tw/regionall/%e6%96%b0%e5%8c%97%e5%b8%82/%e6%b0%b8%e5%92%8c%e5%8d%80?t=1,2&d=1')
        if(ans.status !== 200) return 0
        var {window:{document}} = new JSDOM(ans.data)
    }else{
        var {window:{document}} = await JSDOM.fromFile(
            './server/新北市永和區實價登錄3.0 全台最新房價查詢 _ 永慶房屋 - 永慶房仲網實價登錄.html',
            {contentType: 'text/html'})
    }

	const table = document.querySelectorAll('#dealtable tbody tr')
	const data = []
	console.log(table.length)
    for(let i = 0;i<table.length;i+=2){
        const tds = table[i]
        if(tds.getElementsByClassName('noteBlock')[0]!==undefined) continue
        // console.log(tds.getElementsByClassName('noteBlock')[0])
		const tmp = require('./parseTable')(tds)
		data.push(tmp)
    }
    console.log('selected data:',data.length)
    console.log(data)
}