/**
 * Created by Administrator on 2014/6/10.
 */
define(function() {
    var carContrast = {};
    var config = {
    };
    var ele ={

    };

    var carCount =4;
    var sortString=[];
    var showScroll_x =false;
    var contentTemplate="<th width='' class='title carname'><div style=\"width:245px\"><a><\/a><i class='close-contrast hidden'><\/i><span class='more-detail'><\/span><\/div><\/th>" +
                          "<td class='pic'><div style=\"width:245px\"><\/div><\/td><td class='price-s'><div style=\"width:245px\"><\/div><\/td><td class='price-n'><div style=\"width:245px\"><\/div><\/td>" +
                          "<td class='price-v'><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>" +
        "<td width=''><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td><td><div style=\"width:245px\"><\/div><\/td>";

    var _bind = function () {
        $(".close-contrast").live("click", function (event) {
            var headTh = $(this).parent();
            var headThIndex = headTh.index();

            headTh.deleteContent = deleteContent;

            $.ajax({
                type: "POST",
                url: config.api_deleteContrast,
                data: {
                    cid: $(this).attr("cid")
                },
                dataType: "json",
                context: headTh
            }).done(function (data) {
                this.deleteContent(this.index()+1);
                delete headTh.deleteContent;
            });

            event.stopPropagation();
            return false;
        });

        var hasTouch = false, startX, startY, cloneElement;
        var headNavTop =$(".contrast-table").offset().top;
        var cellWidth = $(".carname").width();
        var cellHeight = $(".carname").height();
        var moveRangeStartX = $(".carname").offset().left;
        var carBoundLeftX = moveRangeStartX;
        var moveRangeEndX = $(".car-title").offset().left + $(".car-title").width();
        var moveRangeStartY = $(".carname").offset().top;
        var moveRangeEndY = $(".carname").offset().top + $(".carname").height();
        var contentPixList , movePosition, defaultPosition;

        $(".more-detail").live("mousedown", function (event) {
            sortString = [];
            for (var index = 0; index < $(".close-contrast").length; index++) {
                sortString.push($(".close-contrast").eq(index).attr("cid"));
            }
            console.log(sortString.toString());
            startX = event.pageX;
            startY = event.pageY;
            hasTouch = true;

            cloneElement = $(this).parent().clone();
            cloneElement.css({
                opacity: 0.8,
                position: 'absolute',
                cursor: 'pointer',
                top: event.pageY - 20 + 'px',
                left: event.pageX - 100 + 'px',
            });
            document.body.appendChild(cloneElement[0]);

            document.body.onselectstart = document.body.ondrag = function () {
                return false;
            }

            contentPixList = [];
            for (var index = 0; index <= carCount; index++) {
                contentPixList.push(moveRangeStartX + index * cellWidth - $(document).scrollLeft());
            }

            defaultPosition = $(this).parent().index();
            for (var index = 0; index < contentPixList.length; index++) {
                if ((event.pageX) < contentPixList[index] + cellWidth && (event.pageX) > contentPixList[index]) {
                    if (movePosition !== index) {
                        movePosition = defaultPosition = index;
                    }
                }
            }
        });

        $(document).mousemove(function (event) {
            if (hasTouch) {
                y = event.pageY;
                x = event.pageX;
                if ((x) < moveRangeEndX && (x) > moveRangeStartX) {

                    cloneElement.css({
                        top: y - 20 + 'px',
                        left: x - 100 + 'px'
                    });

                    for (var index = 0; index < contentPixList.length; index++) {
                        if ((x) < contentPixList[index] + cellWidth && (x) > contentPixList[index]) {

                            if (movePosition != index && (index != defaultPosition - 1) && index <= carCount) {
                                movePosition = index;
                                $(".tempalte").remove();
                                if (movePosition !== defaultPosition) {
                                    addNewContent($(contentTemplate), movePosition, true);
                                }
                            }
                        }
                    }
                }
            }
        });

        $(document).mouseup(function () {
            if (hasTouch) {
                cloneElement.remove();
                hasTouch = false;
                if ($(".tempalte").length != 0) {
                    $(".tempalte").remove();
                    document.body.onselectstart = document.body.ondrag = null;
                    //alert(movePosition);
                    //alert(defaultPosition);
                    var carList = $(".carname");
                    var carListLength = carList.length;

                    var moveItemList = getContentList(defaultPosition);


                    addNewContent(moveItemList, movePosition, false);
                    var temp = sortString[defaultPosition - 1];
                    sortString[defaultPosition - 1] = sortString[movePosition];
                    sortString[movePosition] = temp;

                    sortString = sortString.toString();

                    $.ajax({
                        type: "POST",
                        url: config.api_updateContrastSeq,
                        data: {
                            ids: sortString
                        },
                        dataType: "json",
                        context: self
                    }).done(function (data) {

                    });
                }
            }
        });

        $(".contrast-title input").change(function () {
            var optimal, repeat;
            var repeat = $(".contrast-title input")[0].checked.toString();
            var optimal = $(".contrast-title input")[1].checked.toString();

            window.location = config.api_contrastUrl + "?repeat=" + repeat + "&optimal=" + optimal;
        });

        $(".carname a").live("mouseenter", function () {
            $(this).addClass("carNameHover");
        }).live("mouseout", function () {
            $(this).removeClass("carNameHover");
        });

        $(window).scroll(function (event) {
                var current=$(document).scrollTop();
                if(current>(headNavTop+$(".car-title").height())) {
                    $(".contrast-table .basic-info:eq(0)").css({
                        position: "fixed",
                        top: "0px",
                        backgroundColor: "white"
                    });
                }
                else
                {
                    $(".contrast-table .basic-info:eq(0)").css({
                        position: "",
                        top: "",
                        backgroundColor: "white"
                    });
                }
            }
        );
    }

    var getContentList =function(index)
    {
        var list = $();
        var index = index;
        $("table tr").each(function(idx,item) {
            if($(item).find("td,th").length!=0) {
                var deleteElement = $(item).children()[index];
                list.push(deleteElement);
            }
        });
        return list;
    }

    var getCellContent = function(cell) {
        var a = cell.find("a");
        if (a.length != 0) {
            return {
                content: a.text(),
                type: "a"
            };
        }

        var span = cell.find("span");
        if (span.length != 0) {
            return {
                content: span.text(),
                type: "span"
            };
        }

        var img = cell.find("img");
        if (img.length != 0) {
            return {
                content: img,
                type: "img"
            };
        }

        return {
            content: cell.text(),
            type: ""
        };
    }

    var setCellContent = function(cell,content) {
        if (content) {
            if (content.type === "img") {
                var img = cell.find(content.type);
                if(img.length!=0) {
                    cell.find(content.type).attr("src", content.content.attr("src"));
                }
                else
                {
                    cell.html("<img src='"+content.content.attr("src")+"' width='215px' height='140px'>");
                }
            }
            else if (content.type === "a" || content.type === "span") {
                cell.find(content.type).text(content.content);
            }
            else {
                cell.text("");
            }
        }
        else {
            var type = getCellContent(cell).type;
            if (type === "img") {
                cell.find(type).remove();
            }
            else if (type === "a" || type === "span") {
                cell.find(type).text("");
            }
            else {
                cell.text("");
            }
        }
    }

    var addNewContent=function(list,index,param) {
        //console.log("insert:" + index);
        var position = index;
        var i=0;
        if (index != undefined) {
            $("table tr").each(function (idx, item) {
                if($(item).find("td,th").length!=0) {
                    if (param) {
                        $(item).find(".tempalte").remove();
                        $(list[i]).addClass("tempalte");
                        $(item.children[position]).after($(list[i]));
                    }
                    else {
                        $(item.children[position]).after($(list[i]));
                    }
                    i++;
                }
            });
        }
        else {
            $("table tr").each(function (idx, item) {
                if($(item).find("td,th").length!=0) {
                    if ($(item).find("td,th").length != 0) {
                        $(item).append($(list[i++]));
                    }
                }
            });
        }
    }

    var deleteContent =function(index)
    {
        var list = getContentList(index);

        if(showScroll_x) {
            list.remove();
        }
        else
        {
            list.remove();
            if(carCount<=4) {
                addNewContent($(contentTemplate));
            }
        }
        carCount--;
    }

    var init = function (_config) {
        $.extend(config, _config);
        carCount = config.carNum;

        var num = carCount;
        for(;num<4;num++)
        {
            addNewContent($(contentTemplate));
        }
        $(".table-name").width($(".basic-info").width()-19);
        _bind();
    }

    carContrast.init = init;
    return carContrast;
});


