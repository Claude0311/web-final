const reg = /永和區[\u4E00-\u9FA50-9a-zA-Z]{0,99}號/g

const str = '新北勢永和區竹林號91巷3號2樓'

console.log(str.match(reg))

const reg2 = /gr[\w]{0,10}h/g
const str2 = 'wrgrwegrah'
console.log(str2.match(reg2))