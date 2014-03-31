define([ "souche/custom-select", "lib/lazyload" ], function(e) {
    var a, n, o, i, t = function(e) {
        var a = {};
        for (var n in e) {
            var o = e[n], i = o.name.charAt(0).toUpperCase();
            a[i] || (a[i] = []), o.name = o.name.substr(2, o.name.length), a[i].push(o);
        }
        return a;
    }, s = /^1[3458][0-9]{9}$/, l = {
        totalPage: 1
    }, c = !1, d = !1, r = !0, u = 2;
    return {
        init: function(c) {
            $.extend(l, c);
            var d = this;
            a = new e("brand_select", {
                placeholder: "请选择品牌，可多选"
            }), n = new e("series_select", {
                placeholder: "请选择车系，可多选"
            }), o = new e("age_select", {
                placeholder: "请选择",
                multi: !1
            }), i = new e("model_select", {
                placeholder: "请选择",
                multi: !1
            }), this._bindBrandChange(), this._onlyNum(), l.withCar && this._bindLoadMore();
            var r = function(e) {
                $(".wedo").animate({
                    backgroundPositionY: -20
                }, 300, null, function() {
                    $(".wedo").animate({
                        backgroundPositionY: -40
                    }, 300, null, function() {
                        e && e();
                    });
                });
            };
            setTimeout(function() {
                r(r);
            }, 500), $(".wedo").mouseenter(function() {
                $(".wedo").animate({
                    backgroundPositionY: -20
                }, 300);
            }).mouseleave(function() {
                $(".wedo").animate({
                    backgroundPositionY: -40
                }, 300);
            }), a.removeAllOption(), n.removeAllOption(), $(".car-image img").lazyload(), $.ajax({
                url: contextPath + "/pages/dicAction/loadRootLevel.json",
                dataType: "json",
                data: {
                    type: "car-subdivision"
                },
                success: function(e) {
                    var n = "";
                    e = t(e.items);
                    for (var o in e) {
                        var i = e[o], s = o;
                        n += "<div data-name='" + s + "' class='clearfix word-container'><div class='word-title'>" + s + "</div><div class='word-brands'>";
                        for (var l = 0; l < i.length; l++) {
                            var c = i[l];
                            n += '<a href="#" data-value="' + c.code + '" class="option"><input type="checkbox" class="hidden"/><span class="value">' + c.name + "</span></a>";
                        }
                        n += "</div></div>";
                    }
                    a.addOptions(n);
                },
                error: function() {},
                failure: function() {}
            }), $("#qiugou-form .submit").on("click", function(e) {
                return e.preventDefault(), $("#brand_select .selected_values").val() || $("#series_select .selected_values").val() || $("#age_select .selected_values").val() || $("#model_select .selected_values").val() || $("#price_low_select").val() && $("#price_hight_select").val() ? ($(".warning", d.ele).addClass("hidden"), 
                void Souche.checkPhoneExist(function(e) {
                    e ? d._submit() : ($("#qiugou-popup").removeClass("hidden"), $(".wrapGrayBg").show());
                })) : void $(".warning", d.ele).removeClass("hidden");
            }), $(".choseagain").on("click", function(e) {
                e.preventDefault(), $("#qiugou-container").addClass("show-form");
            }), $("#qiugou_login").on("click", function(e) {
                e.preventDefault(), Souche.MiniLogin.checkLogin(function() {
                    $(".qiugou .go-login").addClass("hidden"), window.location.href = window.location.href + "#qiugou-cur";
                });
            }), $("#qiugou-phone-form").on("submit", function(e) {
                e.preventDefault(), s.test($("#qiugou-phone").val()) ? Souche.PhoneRegister($("#qiugou-phone").val(), function() {
                    $(".go-login").addClass("hidden"), $("#qiugou-popup").addClass("hidden"), $(".wrapGrayBg").hide(), 
                    d._submit();
                }) : $(".warning", this).removeClass("hidden");
            });
        },
        _bindLoadMore: function() {
            var e = this;
            $(window).on("scroll", function() {
                !d && r && $(window).scrollTop() + $(window).height() >= $(document.body).height() && e._loadMore();
            });
        },
        _loadMore: function() {
            d = !0;
            var e = $(".date-title .day");
            return u > 1 * l.totalPage ? void (r = !1) : ($(".load-more").removeClass("hidden"), 
            void $.ajax({
                url: contextPath + "/pages/onsale/match_car_page.html",
                data: {
                    page: u++,
                    key: e.get(e.length - 1).innerHTML
                },
                success: function(e) {
                    "" == e.replace(/\s/, "") && (r = !1), $(".load-more").addClass("hidden"), d = !1, 
                    $("#cars_con").append(e);
                }
            }));
        },
        _submit: function() {
            c || ($(".qiugou .submit").addClass("loading").html("提交中  ..."), $("#qiugou-form").submit());
        },
        _successAnim: function() {},
        _onlyNum: function() {
            setInterval(function() {
                $("#price_low_select").val($("#price_low_select").val().replace(/[^0-9]/, "")), 
                $("#price_hight_select").val($("#price_hight_select").val().replace(/[^0-9]/, ""));
            }, 200);
        },
        _bindBrandChange: function() {
            var e = this;
            0 == a.selected.length && 0 == n.selected.length && n.disable("请先选择品牌"), $(a).on("select", function(a, o) {
                e._addSeries(o.key), n.enable();
            }).on("unselect", function(o, i) {
                e._removeSeries(i.key), 0 == a.selected.length && n.disable("请先选择品牌");
            }).on("show", function() {
                $("html,body").animate({
                    scrollTop: $(".qiugou").offset().top
                }, 200);
            }), a.selected;
            for (var o = 0; o < a.selected.length; o++) e._addSeries(a.selected[o].key);
        },
        _addSeries: function(e) {
            $("#series_select .sc-select-list div[data-brandid=" + e + "]").length || $.ajax({
                url: contextPath + "/pages/dicAction/loadRootLevelForCar.json",
                dataType: "json",
                data: {
                    type: "car-subdivision",
                    code: e
                },
                success: function(a) {
                    var o = "";
                    for (var i in a.codes) {
                        var t = a.codes[i], s = i;
                        o += "<div data-name='" + s + "' data-brandid='" + e + "' class='clearfix word-container'><div class='brand-title'>" + s + "</div>";
                        for (var l = 0; l < t.length; l++) {
                            var c = t[l];
                            o += '<a href="#" data-value="' + c.code + '" class="option"><input type="checkbox" class="hidden"/><span class="value">' + c.name + "</span></a>";
                        }
                        o += "</div>";
                    }
                    n.addOptions(o);
                },
                error: function() {},
                failure: function() {}
            });
        },
        _removeSeries: function(e) {
            $("#series_select .sc-select-list div[data-brandid=" + e + "]").each(function() {
                var e = $(".option", $(this));
                e.each(function(e, a) {
                    var o = $(a).attr("data-value");
                    n.removeSelected(o);
                }), $(this).remove();
            });
        }
    };
});