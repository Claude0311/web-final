<a name="top"></a>
# web-final v1.0.0

房屋估價系統api文件

 - [House](#House)
   - [getHouse](#getHouse)
   - [getHouses](#getHouses)
 - [Near](#Near)
   - [getNear](#getNear)

___


# <a name='House'></a> House

## <a name='getHouse'></a> getHouse
[Back to top](#top)

```
GET /getHouse?id=
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>ID from /getHouses</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>ID from永慶網站</p> |
| buildingType | `String` | <ul> <li>公寓(無電梯)</li> <li>大樓(10樓以下有電梯)</li> <li>華夏(11樓以上有電梯)</li> </ul> |
| coordinate | `Object` | <p>{lat,lng} 緯度、精度</p> |
| unitPrice | `Number` | <p>每坪房價</p> |
| detail | `Object` | <p>house_detail</p> |

### Error response

#### Error response - `NotFound 404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | <p>404</p> |
| msg | `String` | <p>查無此房</p> |

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | <p>500</p> |
| msg | `String` | <p>資料庫發生錯誤</p> |

## <a name='getHouses'></a> getHouses
[Back to top](#top)

```
GET /getHouses
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| houses | `Array` | <p>array of House</p> |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | <p>500</p> |
| msg | `String` | <p>資料庫發生錯誤</p> |

# <a name='Near'></a> Near

## <a name='getNear'></a> getNear
[Back to top](#top)

```
POST /getNear
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| lat | `Number` | <p>緯度</p> |
| lng | `Number` | <p>經度</p> |
| buildingType | `Number` | <ul> <li>公寓</li> <li>電梯大樓</li> <li>華夏</li> </ul> |
| floor | `Number` | <p>樓層(optional)</p> |
| age | `Number` | <p>屋齡(optional)</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| similar | `Array` | <p>array of house that similar to the selected house</p> |
| avgPrice | `Number` | <p>suggested price of the selected house</p> |

### Error response

#### Error response - `Server error 500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| statusCode | `Number` | <p>500</p> |
| msg | `String` | <p>資料庫發生錯誤</p> |
