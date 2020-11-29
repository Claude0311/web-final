<a name="top"></a>
# web-final v1.0.0

房屋估價系統api文件

 - [House](#House)
   - [獲取房屋詳細資訊](#獲取房屋詳細資訊)
   - [獲取所有House基本資訊](#獲取所有House基本資訊)

___


# <a name='House'></a> House

## <a name='獲取房屋詳細資訊'></a> 獲取房屋詳細資訊
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
| detail.soldTime | `Number` | <p>販賣時間 ex. 10911</p> |
| detail.address | `String` | <p>地址</p> |
| detail.price | `Object` | <p>販賣價格 {totalPrice:Number, parkingPrice:Number}</p> |
| detail.space | `Object` | <p>坪數 {totalSpace:Number, parkingSpace:Number}</p> |
| detail.floor | `Object` |  |
| detail.floor.floor | `Number` | <p>樓層</p> |
| detail.floor.maxFloor | `Number` | <p>最高樓層</p> |
| detail.age | `Number` | <p>屋齡(年)</p> |
| detail.hasParking | `Boolean` | <p>有無停車位</p> |

## <a name='獲取所有House基本資訊'></a> 獲取所有House基本資訊
[Back to top](#top)

```
GET /getHouses
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| houses | `Array` | <p>array of Houses</p> |
