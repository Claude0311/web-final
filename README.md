# web programmin final project - House valuation
## Tutorial

### init
```
$ yarn install-all
```
* then open two terminal to run client and server
### client
```
$ yarn start
```

### server
```
$ yarn server
```
## backend
### DB
* House:
```javascript
{
  id,//unique id from website
  buildingType,//公寓(無電梯),大樓(有電梯10樓以下),華夏(有電梯11樓以上)
  coordinate:{lat,lng},//緯度、經度
  unitPrice,//每坪的價格
  //detail, //house_detail's _id
}
```
* House_detail:
```javascript
{
  soldTime,//number like 10911 means 109年11月
  address,//ex:'永和區竹林路1~30號'
  price: {totalPrice, parkingPrice},
  space: {totalSpace, parkingSpace},
  floor: {floor, maxFloor},
  age, //屋齡，年
  parkingSpace//true/false
}
```

### api
* 請見[/backend/readme.md](https://github.com/Claude0311/web-final/tree/main/backend)



## ref
### geoJson
* [geoJson教學 - 全台版本](https://www.oxxostudio.tw/articles/201803/google-maps-15-geojson-taiwan.html)
* [geoJson資料庫 - 縣市邊界](https://sheethub.com/ronnywang/%E9%84%89%E9%8E%AE%E5%B8%82%E5%8D%80%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E7%95%8C%E7%B7%9A/uri/19260537)
* [geoJson大安區村里圖](https://sheethub.com/ronnywang/%E5%85%A8%E5%8F%B0%E7%81%A3%E6%9D%91%E9%87%8C%E7%95%8C%E5%9C%96_20140501/sql?sql=SELECT+*+FROM+this+WHERE+TOWN+IN+%27%E5%A4%A7%E5%AE%89%E5%8D%80%27+ORDER+BY+_id_+ASC)
  * 善用SQL查詢其他縣市/區
  * [其他界圖](https://sheethub.com/search?q=%E7%95%8C%E5%9C%96)
* 之前有看過街道劃分的geojson可是現在找不到
### 房屋價格(暫定永慶)
* [591](https://market.591.com.tw/)
  * 不要，好爛
  * 沒filter
  * 沒去車位
* [內政部](https://lvr.land.moi.gov.tw/login.action#)
  * 有excel
* [永慶](https://evertrust.yungching.com.tw/map?kw=&lat=25.0083253&lng=121.5170166&d=6&t=2&a=&c=)
  * 車位調整
  * 大樓名稱
  * 有excel
### 資料選擇
* 條件：重要->不重要
  * (至少)5筆資料
  * 屋型型態
  * 1km內
  * 2年內
  * 500m內
  * 半年內
  * 屋齡
  * 樓層(3層樓+$5000/坪
* 前端呈現
  * 去頭尾後的平均
  * 常態分佈圖
  * 附近房子


