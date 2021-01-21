# [109-1] Web Programming Final 
## (Group 30) 房屋查詢與估價系統
### useful links
* [deployed web](https://houses-valuation.herokuapp.com/)
* [demo video](#)
### description
* 後端請見[/backend/readme.md](https://github.com/Claude0311/web-final/tree/main/backend)
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

### 使用與參考之框架/模組/原始碼
* 後端框架：express.js
### 專題製作心得
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