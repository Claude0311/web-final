(this["webpackJsonpweb-final"]=this["webpackJsonpweb-final"]||[]).push([[0],{17:function(module,__webpack_exports__,__webpack_require__){"use strict";var C_Users_88691_Documents_JS_web_final_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),axios__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(18),axios__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__),Post=function Post(){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)("connecting bakend"),_useState2=Object(C_Users_88691_Documents_JS_web_final_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState,2),response=_useState2[0],setResponse=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("http://localhost:4000/func").then((function(_ref){var data=_ref.data;console.log("get data\uff1a\n".concat(data)),console.log(data);var hey=eval("("+data.hey+")");hey(),setResponse("connect to backend")})).catch((function(_){console.error(_),setResponse("backend connect fail")}))}),[]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{children:response})};__webpack_exports__.a=Post},25:function(_,e,t){},26:function(_,e,t){},46:function(_,e,t){"use strict";t.r(e);var a=t(2),n=t(1),c=t.n(n),r=t(4),s=t.n(r),o=(t(25),t.p,t(26),t(6)),u=t(19),i=function(_){var e=_.text;return Object(a.jsx)("div",{children:e})},l=function(){var _=Object(n.useState)({lat:25.017,lng:121.537}),e=Object(o.a)(_,2),t=e[0],c=(e[1],Object(n.useState)(16)),r=Object(o.a)(c,2),s=r[0];r[1];return Object(a.jsx)("div",{style:{height:"100vh",width:"100%"},children:Object(a.jsx)(u.a,{bootstrapURLKeys:{key:"AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0"},defaultCenter:t,defaultZoom:s,children:Object(a.jsx)(i,{lat:t.lat,lng:t.lng,text:"My Marker"})})})},E=t(17);var O=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(E.a,{}),Object(a.jsx)(l,{})]})},b=function(_){_&&_ instanceof Function&&t.e(3).then(t.bind(null,47)).then((function(e){var t=e.getCLS,a=e.getFID,n=e.getFCP,c=e.getLCP,r=e.getTTFB;t(_),a(_),n(_),c(_),r(_)}))};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(O,{})}),document.getElementById("root")),b()}},[[46,1,2]]]);
//# sourceMappingURL=main.7ff5d5f4.chunk.js.map