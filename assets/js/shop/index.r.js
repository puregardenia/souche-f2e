define("shop/shopMap.js",[],function(){function e(e){var t=new BMap.Map("shop-map"),n=new BMap.Point(e.log,e.lat),r=new BMap.Marker(n);t.addOverlay(r),t.centerAndZoom(n,20);var i={anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_ZOOM};t.addControl(new BMap.NavigationControl(i));var s={width:100,height:80,title:"海华二手车精品店",enableMessage:!0,message:"大搜车授权店 海华二手车精品店 地址: 浙江省杭州市绍兴路86号"},o=new BMap.InfoWindow("地址: 浙江省杭州市绍兴路86号",s);r.addEventListener("click",function(){t.openInfoWindow(o,n)})}return{init:e}}),define("souche/util/tool",[],function(){var e={getMax:function(){var e=null;Array.isArray(arguments[0])?e=arguments[0]:e=[].slice.call(arguments);var t=-Infinity;for(var n=0,r=e.length;n<r;n++)e[n]>t&&(t=e[n]);return t},getMin:function(){var e=null;Array.isArray(arguments[0])?e=arguments[0]:e=[].slice.call(arguments);var t=Infinity;for(var n=0,r=e.length;n<r;n++)e[n]<t&&(t=e[n]);return t},getMaxMin:function(){var e=null;Array.isArray(arguments[0])?e=arguments[0]:e=[].slice.call(arguments);var t=Infinity,n=-Infinity;for(var r=0,i=e.length;r<i;r++)e[r]<t&&(t=e[r]),e[r]>n&&(n=e[r]);return{max:n,min:t}},parseUrlParam:function(){var e=location.search;if(!e)return{};var t=e.substring(1,e.length).split("&"),n={};for(var r=0;j=t[r];r++)n[j.substring(0,j.indexOf("=")).toLowerCase()]=j.substring(j.indexOf("=")+1,j.length);return n}},t={isArray:function(){Array.isArray||(Array.isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"})}},n=n||!1;if(!n){for(var r in t)t.hasOwnProperty(r)&&t[r]();n=!0}return e}),define("shop/index",["shop/shopMap.js","souche/util/tool"],function(e,t){function l(){$.extend(n,shopConfig||{}),o.init(),f.bind()}var n={},r="maxPrice",i="minPrice",s=t.parseUrlParam(),o={init:function(){o.initShopMap()},initShopMap:function(){var t={},r=n.shopLocation.split(",");t.log=Number(r[0]),t.lat=Number(r[1]),e.init(t)}},u={checkPrice:function(e){return!Boolean(e)&&e!==0?!1:e<0?!1:!0}},a=null,f={bind:function(){$("#submit-price").on("click",f.changePriceChoose)},changePriceChoose:function(e){e.preventDefault();var t=window.location.pathname,n=Number($("#min-price").val()),o=Number($("#max-price").val());if(u.checkPrice(o)&&u.checkPrice(n)){o<n?(s[r]=n,s[i]=o):(s[r]=o,s[i]=n);var f=[];for(var l in s)f.push(l+"="+s[l]);window.location.href=t+"?"+f.join("&")}else clearTimeou(a),$("price-warning").removeClass("hidden"),a=setTimeout(function(){$("price-warning").addClass("hidden")},2e3)}};return{init:l}});