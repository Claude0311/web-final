# [109-1] Web Programming Final 
## (Group 30) 房屋查詢與估價系統
### useful links
* [deployed web](https://houses-valuation.herokuapp.com/)
* [demo video](#)
### description
1. 登入以及管理員系統
2. 依據地區、成交價等參數查詢近期房屋成交的情況。
3. 輸入欲購買的房屋參數，會依據[公式](https://github.com/Claude0311/web-final/tree/main/backend#估價公式)預估房屋價格，管理員也會依據自身經驗給出人工預估的價格。
4. 管理員可以自行調控估價的準則
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
登入帳密：
* 一般使用者(也歡迎體驗註冊功能)：
    * 帳號：eee
    * 密碼：eee
* 管理員：
    * 帳號：ntuee-webprogramming
    * 密碼：password
操作方式參見[demo影片](#useful-links)
### 使用與參考之框架/模組/原始碼
* 後端框架：express.js
### 專題製作心得
* 陳君輔：一開始會碰網站是因為我媽公司想要做一個估價系統但是沒有經費，那時我想說自己幫她刻一個，就開始自學php，試著用google map api和geojson把頁面架出來，可是成品跟垃圾一樣。這學期對nodejs比較熟練了，藉著final來把這專案完成，後端的架設還算順利，最大的挑戰大概是要調出準確的估價公式，為此必須和需求方多次討論，修正各參數的權重。
* 黃靖傑：這次專案製作的過程其實我看到自己對程式架構的能力真的比之前進步了，對於第三方套件的理解與運用也有進步，然而最困難的挑戰果然還是在設計程式架構這件事情上，寫前端時資料存放的層級和函式的scope真的好困難，常常是為了加入新的功能不得不把hook,function搬到其他位置才能利用，然後如果要顧慮到使用者體驗的話那邏輯的複雜程度又突然變高好幾個層次，真的是滿佩服現在的網頁工作者呢。總之很開心在這學期學到更多和網頁開發相關的知識，也能順利地用在製作專案上，寫網頁真的挺好玩的。
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
    4. UI: antd
### 組員貢獻
* b07901029陳君輔
後端(全) + deploy
* b07901028黃靖傑
前端： UI設計 + 登入系統 + 地圖 + 評分系統
* b07901089俞建琁

### 對於此課程的建議
* 
