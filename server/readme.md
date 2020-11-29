<a name="top"></a>
# web-final v1.0.0

房屋估價系統api文件

 - [House](#House)
   - [getHouse](#getHouse)
   - [getHouses](#getHouses)

___


# <a name='House'></a> House

## <a name='getHouse'></a> getHouse
[Back to top](#top)

```
GET /getHouse
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>ID from永慶網站</p> |
| buildingType | `String` | <p>公寓(無電梯)、大樓(10樓以下有電梯)、華夏(11樓以上有電梯)</p> |
| coordinate | `Object` | <p>{lat,lng} 緯度、精度</p> |
| unitPrice | `Number` | <p>每坪房價</p> |
| detail | `Object` | <p>house_detail</p> |

## <a name='getHouses'></a> getHouses
[Back to top](#top)

```
GET /getHouses
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| houses | `Array` | <p>array of Houses</p> |
