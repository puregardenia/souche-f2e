define(['detail/report/histogram'], function(Histogram){

    var baseConfig = {
        y: {
            show: true,
            style: { width: '58px', dis: '20px'},
            axis: { className: 'y-axis' },
            scale: { className: 'y-scale-item', items: [], valueStyleProp: 'top' }
        },
        x: {
            show: true,
            axis: { className: 'x-axis' },
            scale: { className: 'x-scale-item', items: [] }
        },
        bar: {
            style: { width: '50px', height: '215px', dis: '25px' },
            items: [],
            max: 1.9,
            min: 1.2,
            guide: 1.6,
            cond: {
                more: { className: 'normal', text: '安全' },
                less: { className: 'danger', text: '危险' }
            },
            // 初始时 不通过值判断class
            condClass: false
        }
    };


    function getConfig( x, y, bar, ctn){
        var newConf = $.extend(true, {}, baseConfig);
        if(x){
            newConf.x.scale.items = x;
        }
        else{
            newConf.x.show = false;
        }
        if(y){
            newConf.y.scale.items = y;
        }
        else{
            newConf.y.show = false;
        }
        newConf.bar = $.extend(true, {}, newConf.bar, bar);
        newConf.ctn = ctn;
        // console.log(newConf);
        return newConf;
    }

    var wheelDepth = {
        init: function(){
            var hist = new Histogram(wheelDepth.getConfig());
            wheelDepth.hist = hist;
            wheelDepth.bind();
            // for debug
            window.hist = hist;
        },
        getConfig: function(){
            var yItems =  [
                    {text: '1.9mm', value: 1.9},
                    {text: '1.6mm<br/>警戒值', value: 1.6},
                    {text: '1.2mm', value: 1.2}
                    ];
            var xItems =  [{text: '左前轮'},
                    {text: '左后轮'},
                    {text: '右前轮'},
                    {text: '右后轮'} ];
             var barConf = {
                max: 1.9,
                min: 1.2,
                guide: 1.6,
                items: [
                { name: '左前轮', value:  0},
                { name: '左后轮', value:  0},
                { name: '右前轮', value:  0},
                { name: '右后轮', value:  0}
                ],
                cond: {
                    more: { className: 'normal', text: '安全' },
                    less: { className: 'danger', text: '危险' }
                },
                condClass: false
            };
            return getConfig( xItems, yItems, barConf, $('.wheel-depth .safety-item-bd') );
        },
        bind: function(){
            setTimeout(function(){
                wheelDepth.hist.updateBar([1.8, 1.55, 1.65, 1.75]);
            }, 3000);
        }
    };

    var brakeThickness = {
        init: function(){
            var hist = new Histogram(brakeThickness.getConfig());
            brakeThickness.hist = hist;
            brakeThickness.bind();
        },
        getConfig: function(){
            var yItems =  [
                    {text: '1.9mm', value: 1.9},
                    {text: '1.6mm<br/>警戒值', value: 1.6},
                    {text: '1.2mm', value: 1.2}
                    ];
            var xItems =  [{text: '左前轮'},
                    {text: '左后轮'},
                    {text: '右前轮'},
                    {text: '右后轮'} ];
             var barConf = {
                max: 1.9,
                min: 1.2,
                guide: 1.6,
                items: [
                { name: '左前轮', value:  0},
                { name: '左后轮', value:  0},
                { name: '右前轮', value:  0},
                { name: '右后轮', value:  0}
                ],
                cond: {
                    more: { className: 'normal', text: '安全' },
                    less: { className: 'danger', text: '危险' }
                },
                condClass: false
            };
            return getConfig( xItems, yItems, barConf, $('.brake-thickness .safety-item-bd') );
        },
        bind: function(){
            setTimeout(function(){
                brakeThickness.hist.updateBar([1.65, 1.85, 1.65, 1.7]);
            }, 3000);
        }
    };

    var liquidLevel = {
        init: function(){
            var hist = new Histogram(liquidLevel.getConfig());
            liquidLevel.hist = hist;
            liquidLevel.bind();
        },
        getConfig: function(){
            var yItems =  [
                    {text: '', value: 3},
                    {text: '(最高警戒值)', value: 2},
                    {text: '(最高警戒值)', value: 1},
                    {text: '', value: 0}
                    ];
            var xItems =  [{text: '制动液'},
                    {text: '机油'},
                    {text: '助力油'},
                    {text: '变速箱'} ];
            var barConf = {
                max: 3,
                min: 0,
                guide: [1, 2],
                items: [
                { name: '制动液', value:  0},
                { name: '机油', value:  0},
                { name: '助力油', value:  0},
                { name: '变速箱', value:  0}
                ],
                cond: {
                    more: { className: 'danger', text: '危险' },
                    less: { className: 'danger', text: '危险' },
                    between: { className: 'normal', text: '安全' }
                },
                condClass: false
            };
            return getConfig( xItems, yItems, barConf, $('.liquid-level .safety-item-bd') );
        },
        bind: function(){
            setTimeout(function(){
                liquidLevel.hist.updateBar([1.65, 1.85, 1.65, 2.3]);
            }, 4000);
        }
    };

    var antiFreeze = {
        init: function(){
            var hist = new Histogram(antiFreeze.getConfig());
            antiFreeze.hist = hist;
            antiFreeze.bind();
        },
        getConfig: function(){
            var yItems =  [
                    {text: '', value: -10},
                    {text: '-25C<br/>最高警戒值', value: -25},
                    {text: '-45C<br/>最低警戒值', value: -45},
                    {text: '', value: -70}
                    ];
            var xItems =  false;
            var barConf = {
                max: -10,
                min: -70,
                guide: [-25, -45],
                // 初始值 应该为底部 而不是简单的0
                items: [
                    { name: '防冻液冰点', value:  -70}
                ],
                cond: {
                    more: { className: 'danger', text: '危险' },
                    less: { className: 'danger', text: '危险' },
                    between: { className: 'normal', text: '安全' }
                },
                // 初始时 不通过值判断class
                condClass: false
            };
            return getConfig( xItems, yItems, barConf, $('.antifreeze .safety-item-bd') );
        },
        bind: function(){
            setTimeout(function(){
                antiFreeze.hist.updateBar([-30]);
            }, 4000);
        }
    };
    




    var safetyModule = {
        init: function(){
            wheelDepth.init();
            brakeThickness.init();
            liquidLevel.init();
            antiFreeze.init();
        }
    };
    



    return safetyModule;
});