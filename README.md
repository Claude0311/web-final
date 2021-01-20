# [109-1] Web Programming Final 
## (Group 30) 房屋查詢與估價系統
### useful links
* [deployed web](https://houses-valuation.herokuapp.com/)
* [demo video](#)
### description
1. 登入以及管理員系統
2. 依據地區、成交價等參數查詢近期房屋成交的情況。
3. 輸入欲購買的房屋參數，會依據[公式](https://github.com/Claude0311/web-final/tree/main/backend#估價公式)預估房屋價格，管理員也會依據自身經驗給出人工預估的價格。
### 使用/操作方式
#### init
```
$ yarn install-all
```
#### develop mode
```
$ yarn dev
```
#### deploy mode
```
$ yarn build
$ yarn start-build
```
操作方式參見[demo影片](#useful-links)
### 使用與參考之框架/模組/原始碼
* 後端框架：express.js
### 專題製作心得
* 陳君輔：一開始會碰網站是因為我媽公司想要做一個估價系統但是沒有經費，那時我想說自己幫她刻一個，就開始自學php，試著用google map api和geojson把頁面架出來，可是成品跟垃圾一樣。這學期對nodejs比較熟練了，藉著final來把這專案完成，後端的架設還算順利，最大的挑戰大概是要調出準確的估價公式，為此必須和需求方多次討論，修正各參數的權重。
### 使用之第三方套件、框架、程式碼
* 全端
    1. 開發：nodemon, npm-run-all
    2. 發布：node, heroku-keep-awake, connect-history-api-fallback
* 後端
    1. 基本框架：express
    2. 資料庫：mongoose, connect-mongo, express-session
    3. 爬蟲：axios, csv-string, node-cron
    4. 安全性：cors, bcrypt
    5. 地圖：node-geocoder
    6. api輔助：apidoc, apidoc-markdown
    7. 除錯：express-validator, express-async-handler
* 前端
    1. routing: react-route-dom
    2. cluster: supercluster, useSupercluster
    3. 可拖曳物件: react-beautiful-dnd
### 組員貢獻
* b07901029陳君輔
後端(全) + deploy
* b07901028黃靖傑
前端： UI設計 + 登入系統 + 地圖 + 評分系統
* b07901089俞建琁

### 對於此課程的建議
* 