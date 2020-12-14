<a name="top"></a>
# web-final v1.0.0

房屋估價系統與api文件


 
- [功能介紹](#prepend)
 - [House](#house)
   - [getHouse](#gethouse)
   - [getHouses](#gethouses)
 - [Valuate](#valuate)
   - [更新房屋內容](#更新房屋內容)
   - [請求估價](#請求估價)
   - [get valuations as auth](#get-valuations-as-auth)
   - [get valuations as user](#get-valuations-as-user)
   - [set manual price](#set-manual-price)

___

 
<a name="prepend"></a>
## 功能介紹
### crawler
* 用node-cron套件設定每月1日00:00重新抓資料
* 從永慶房屋爬近一個月永和區的[資料](https://evertrust.yungching.com.tw/regionall/%e6%96%b0%e5%8c%97%e5%b8%82/%e6%b0%b8%e5%92%8c%e5%8d%80?t=1,2&d=1)
### 評分機制
* 參考/model/House.js House.methods.score()
* 順序：
    1. 1公里內
    2. 是否是一樓(一樓房子參考一樓資料；其餘樓層參考其餘樓層資料)
    3. 2年內
    4. 500公尺內
    5. 半年內
    6. 屋齡+-5年

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

___


## House

### getHouse
[Back to top](#top)

給定id獲得房子的詳細資訊

```
GET /houses/:id
```

#### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content-type | `String` | axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/> 或者'application/json'也行 |

#### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | ID from /getHouses |

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | ID from永慶網站 |
| buildingType | `String` |  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| coordinate | `Object` | 經緯度 |
| &ensp;lat | `Number` | 緯度 |
| &ensp;lng | `Number` | 經度 |
| unitPrice | `Number` | 每坪房價 |
| detail | `Object` | house_detail |
| &ensp;soldTime | `Number` | 出售時間10911 |
| &ensp;addres | `String` | 地址 |
| &ensp;price | `Object` | 價格 |
| &ensp;&ensp;totalPrice | `Number` | 總價 |
| &ensp;&ensp;parkingPrice | `Number` | 車位價格 |
| &ensp;space | `Object` | 坪數 |
| &ensp;&ensp;totalSpace | `Number` | 總坪數 |
| &ensp;&ensp;parkingSpace | `Number` | 車位坪數 |
| &ensp;floor | `Object` |  |
| &ensp;&ensp;floor | `Number` | 樓層 |
| &ensp;&ensp;maxFloor | `Number` | 房屋總樓層數 |
| &ensp;age | `Number` | 屋齡 |
| &ensp;hasParking | `Boolean` | 有無車位 |

#### Error response

##### Error response - `NotFound 404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 404 |
| msg | `String` | 查無此房 |

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

### getHouses
[Back to top](#top)

拿到所有房子的座標、房屋型態、價格(顯示在地圖上)

```
GET /houses
```

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | array of Houses |
| &ensp;id | `String` | id from 永慶房屋 |
| &ensp;buildingType | `String` | 房屋型態  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;coordinate | `Object` | 經緯度 |
| &ensp;&ensp;lat | `Number` | 緯度 |
| &ensp;&ensp;lng | `Number` | 經度 |
| &ensp;unitPrice | `Number` | 單位坪數價錢 |

#### Error response

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

## Valuate

### 更新房屋內容
[Back to top](#top)

更新房屋資訊，重新計算系統估價

```
PUT /valuate/user
```

#### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| _id | `String` | 待估房子的_id |
| lat | `Number` | 緯度(optional) |
| lng | `Number` | 經度(optional) |
| buildingType | `String` | (optional)  <li>公寓</li> <li>電梯大樓</li> <li>華夏</li>  |
| floor | `Number` | 樓層(optional) |
| age | `Number` | 屋齡(optional) |

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| similar | `Array` | array of house that similar to the selected house |
| avgPrice | `Number` | suggested price of the selected house |

#### Error response

##### Error response - `User error 404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 404 |
| msg | `String` |  <li>查無此房</li>  |

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

### 請求估價
[Back to top](#top)

給定座標和房屋資訊，提供附近相似房子以及預估價錢

```
POST /valuate
```

#### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content-type | `String` | axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/> 或者'application/json'也行 |

#### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| lat | `Number` | 緯度 |
| lng | `Number` | 經度 |
| buildingType | `String` |  <li>公寓</li> <li>電梯大樓</li> <li>華夏</li>  |
| floor | `Number` | 樓層(optional) |
| age | `Number` | 屋齡(optional) |

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| similar | `Array` | array of house that similar to the selected house |
| avgPrice | `Number` | suggested price of the selected house |

#### Error response

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

### get valuations as auth
[Back to top](#top)

顯示所有待估價房屋

```
GET /valuate/auth
```

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | array of valuate |
| &ensp;_id | `Object` | 待估房子的_id，put時回傳 |
| &ensp;coordinate | `Object` | {lat,lng}經緯度 |
| &ensp;user | `String` | default b07901029 |
| &ensp;buildingType | `String` |  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;age | `Number` | 屋齡 |
| &ensp;floor | `Number` | 樓層 |
| &ensp;avgPrice | `Number` | 系統算出來的$ |
| &ensp;similar | `Object[]` | 附近相似的房子 |
| &ensp;&ensp;id | `String` | id from 永慶房屋 |
| &ensp;&ensp;buildingType | `String` | 房屋型態  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;&ensp;coordinate | `Object` | 經緯度 |
| &ensp;&ensp;&ensp;lat | `Number` | 緯度 |
| &ensp;&ensp;&ensp;lng | `Number` | 經度 |
| &ensp;&ensp;unitPrice | `Number` | 單位坪數價錢 |

#### Error response

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

### get valuations as user
[Back to top](#top)

顯示user的估價們

```
GET /valuate/user
```

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | array of valuate |
| &ensp;_id | `Object` | 待估房子的_id，put時回傳 |
| &ensp;coordinate | `Object` | {lat,lng}經緯度 |
| &ensp;user | `String` | (optional)暫時用不到 |
| &ensp;buildingType | `String` |  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;age | `Number` | 屋齡 |
| &ensp;floor | `Number` | 樓層 |
| &ensp;avgPrice | `Number` | 系統算出來的$ |
| &ensp;similar | `Object[]` | 附近相似的房子 |
| &ensp;&ensp;id | `String` | id from 永慶房屋 |
| &ensp;&ensp;buildingType | `String` | 房屋型態  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;&ensp;coordinate | `Object` | 經緯度 |
| &ensp;&ensp;&ensp;lat | `Number` | 緯度 |
| &ensp;&ensp;&ensp;lng | `Number` | 經度 |
| &ensp;&ensp;unitPrice | `Number` | 單位坪數價錢 |

#### Error response

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

### set manual price
[Back to top](#top)

設定人為估價

```
PUT /valuate/auth
```

#### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| _id | `String` | 待估房子的_id |
| manualPrice | `Number` | 人為估價 |

#### Success response

##### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - |  |  |

#### Error response

##### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |
