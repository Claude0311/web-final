define({ "api": [
  {
    "type": "get",
    "url": "/getHouse",
    "title": "獲取房屋詳細資訊",
    "name": "GetHouse",
    "group": "House",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID from永慶網站</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "buildingType",
            "description": "<p>公寓(無電梯)、大樓(10樓以下有電梯)、華夏(11樓以上有電梯)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "coordinate",
            "description": "<p>{lat,lng} 緯度、精度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "unitPrice",
            "description": "<p>每坪房價</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "detail",
            "description": "<p>house_detail</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "detail.soldTime",
            "description": "<p>販賣時間 ex. 10911</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail.address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "detail.price",
            "description": "<p>販賣價格 {totalPrice:Number, parkingPrice:Number}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "detail.space",
            "description": "<p>坪數 {totalSpace:Number, parkingSpace:Number}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "detail.floor",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "detail.floor.floor",
            "description": "<p>樓層</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "detail.floor.maxFloor",
            "description": "<p>最高樓層</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "detail.age",
            "description": "<p>屋齡(年)</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "detail.hasParking",
            "description": "<p>有無停車位</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/api/house/getHouse.js",
    "groupTitle": "House"
  },
  {
    "type": "get",
    "url": "/getHouses",
    "title": "獲取所有House基本資訊",
    "name": "GetHouses",
    "group": "House",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "houses",
            "description": "<p>array of Houses</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/api/house/getHouses.js",
    "groupTitle": "House"
  }
] });
