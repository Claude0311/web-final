<a name="top"></a>
# web-final v1.0.0

房屋估價系統api文件

 - [House](#markdown-header-house)
   - [getHouse](#markdown-header-gethouse)
   - [getHouses](#markdown-header-gethouses)
 - [Near](#markdown-header-near)
   - [getNear](#markdown-header-getnear)

___


# House

## getHouse
[Back to top](#top)

```
GET /getHouse?id=
```

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
| coordinate | `Object` | {lat,lng} 緯度、精度 |
| unitPrice | `Number` | 每坪房價 |
| detail | `Object` | house_detail |

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

```
GET /getHouses
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| houses | `Array` | array of House |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | 500 |
| msg | `String` | 資料庫發生錯誤 |

# Near

## getNear
[Back to top](#top)

```
POST /getNear
```

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
