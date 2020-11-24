# web programmin final project - House valuation
## How to run our code

### init
```
$ yarn install
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

## ref
* [geoJson教學 - 全台版本](https://www.oxxostudio.tw/articles/201803/google-maps-15-geojson-taiwan.html)
* [geoJson資料庫 - 縣市邊界](https://sheethub.com/ronnywang/%E9%84%89%E9%8E%AE%E5%B8%82%E5%8D%80%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E7%95%8C%E7%B7%9A/uri/19260537)
* [geoJson大安區村里圖](https://sheethub.com/ronnywang/%E5%85%A8%E5%8F%B0%E7%81%A3%E6%9D%91%E9%87%8C%E7%95%8C%E5%9C%96_20140501/sql?sql=SELECT+*+FROM+this+WHERE+TOWN+IN+%27%E5%A4%A7%E5%AE%89%E5%8D%80%27+ORDER+BY+_id_+ASC)
  * 善用SQL查詢其他縣市/區
  * [其他界圖](https://sheethub.com/search?q=%E7%95%8C%E5%9C%96)
* 之前有看過街道劃分的geojson可是現在找不到
### 房屋價格
* [591(老媽推薦)](https://market.591.com.tw/)
 * 不要
* [內政部](https://lvr.land.moi.gov.tw/login.action#)
 * 有excel
* [永慶](https://evertrust.yungching.com.tw/map?kw=&lat=25.0083253&lng=121.5170166&d=6&t=2&a=&c=)
 * 車位調整
 * 大樓名稱
 * 有excel
* 條件(重要->不重要)，常態分布圖
 * (至少)5筆資料去頭尾
 * 屋型型態
 * 500m
 * 半年內
 * 樓層(3層樓+$5000/坪

