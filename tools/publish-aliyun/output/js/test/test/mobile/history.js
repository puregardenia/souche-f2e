var History=function(){var a={queryURL:""},e=[],t="",n={},r=function(){var t=[];return n={},e.forEach(function(a){a&&a.carId&&(t.push(a.carId),n[a.carId]=a)}),0==t.length?void $(".cars").append("<div class=no>暂无浏览记录</div>"):(SM.LoadingTip.show("加载中"),void $.ajax({url:a.queryURL,type:"get",data:{ids:t.join(",")},dataType:"json",success:function(a){console.log(a),a.page.items.forEach(function(a){console.log(a),n[a.carVo.id].car=a}),o(),SM.LoadingTip.hide()}}))},o=function(){if(0==e.length)return void $(".cars").append("<div class=no>暂无浏览记录</div>");var a=new Date,r=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate(),o=new Date(e[0].time),i=o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate(),c=[];e.forEach(function(a){var e=new Date(a.time),o=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();if(o!=i){$(".cars").append("<div class=date>"+i+(r==i?"（今天）":"")+"</div>");var s=Mustache.render(t,{cars:c});$(".cars").append(s),c=[],i=o}c.push(n[a.carId].car),console.log(o)}),$(".cars").append("<div class=date>"+i+(r==i?"（今天）":"")+"</div>");var s=Mustache.render(t,{cars:c});$(".cars").append(s)};return{init:function(n){for(var o in n)a[o]=n[o];e=HistoryUtil.getAll(),e=e.sort(function(a,e){return a.time<e.time}),console.log(e),t=$("#tpl_cars").html(),r()}}}();