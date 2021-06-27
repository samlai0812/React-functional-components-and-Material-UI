## React function components and Material UI

#### 修改尚硅谷教程 React Class Component 的 Count 求和案例，使用 React Functional Component 和 Material UI

#### Button 被 override， 看 App.jsx

    const theme = createMuiTheme({
    overrides: {
        MuiButton: {
        contained: {
            height: 55,
            marginRight: 20,
        },
        },
    },
    });

#### TextField 的 ref 要改為 inputRef

#### Count 和 Person 的信息傳遞，使用 Pub Sub

    安裝: npm pubsub-js
    setState 執行後，更新了 state，然後 React render DOM,
    但是由於 setState 是異步函數，無法及時取得最新的 state 給 PubSub.publish 傳遞 state
    所以把 publish 放在 useEffect 里面。

### Deploy

安裝 gh-pages : npm install gh-pages --save-dev
修改 package.json :

    "homepage": "https://samlai0812.github.io/React-functional-components-and-Material-UI"
    "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",

publish : npm run build

webpage https://samlai0812.github.io/React-functional-components-and-Material-UI
