<a name="top"></a>
# web-final v1.0.0

房屋估價系統api文件

 - [House](#house)
   - [getHouse](#gethouse)
   - [getHouses](#gethouses)
 - [Valuate](#valuate)
   - [askPrice](#askprice)
   - [get all uncheck Valuation](#get-all-uncheck-valuation)

___


# House

## getHouse
[Back to top](#top)

給定id獲得房子的詳細資訊

```
GET /getHouse?id=
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content-type | `String` | axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/> 或者'application/json'也行 |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | ID from /getHouses |

### Success response

#### Success response - `Success 200`

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

### Error response

#### Error response - `NotFound 404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 404 |
| msg | `String` | 查無此房 |

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

## getHouses
[Back to top](#top)

拿到所有房子的座標、房屋型態、價格(顯示在地圖上)

```
GET /getHouses
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | array of Houses |
| &ensp;id | `String` | id from 永慶房屋 |
| &ensp;buildingType | `String` | 房屋型態  <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li>  |
| &ensp;coordinate | `Object` | 經緯度 |
| &ensp;&ensp;lat | `Number` | 緯度 |
| &ensp;&ensp;lng | `Number` | 經度 |
| &ensp;unitPrice | `Number` | 單位坪數價錢 |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

# Valuate

## askPrice
[Back to top](#top)

給定座標和房屋資訊，提供附近相似房子以及預估價錢

```
POST /askPrice
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| content-type | `String` | axios預設'application/x-www-form-urlencoded'，不用特別修改。<br/> 或者'application/json'也行 |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| lat | `Number` | 緯度 |
| lng | `Number` | 經度 |
| buildingType | `Number` |  <li>公寓</li> <li>電梯大樓</li> <li>華夏</li>  |
| floor | `Number` | 樓層(optional) |
| age | `Number` | 屋齡(optional) |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| similar | `Array` | array of house that similar to the selected house |
| avgPrice | `Number` | suggested price of the selected house |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

## get all uncheck Valuation
[Back to top](#top)

顯示所有待估價房屋

```
GET /showValu/auth
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | array of valuate |
| &ensp;coordinate | `String` | {lat,lng}經緯度 |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |