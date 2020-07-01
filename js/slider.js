$(function () {

    var slideWidth = $('.slide').outerWidth(); // .slideの幅を取得して代入
    var slideNum = $('.slide').length; // .slideの数を取得して代入
    var slideCount = 1;  //slideの初期値
    var indicator = $(".indicator");
    var indicatorHTML = "";
    var dotIndex = 1;
    var slideSetWidth = slideWidth * (slideNum + slideWidth * 3); // .slideの幅×数で求めた値を代入
    $('.slideSet').css('width', slideSetWidth); // .slideSetのCSSにwidth: slideSetWidthを指定
    var clickFlag = true;

    $(".slideSet").stop(true).animate({
        left: slideCount * -slideWidth
    },0);

    //インジケーターの生成
    $(".slide").each(function (){
        indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
        indicator.html(indicatorHTML);
        dotIndex++;
    });

    //インジケーター初期位置
    $(".dot:first-child").css({
        backgroundColor: "#fff"
    });

    //最初のスライドを複製してslideSet内最後に付け加える
    function cloneSlide() {
        $(".slideSet").find(".slide:last-child").clone(true).prependTo($(".slideSet"));
        $(".slideSet").find(".slide:nth-child(2)").clone(true).appendTo($(".slideSet"));
    }

    //インジケーター
    $(".dot").click(function(){
        //クリックされたドットの特定
        var idname = $(this).attr("id");
        var currentDot = $(`.dot#${idname}`);
        $(".dot").css({
            backgroundColor: "#333"
        });
        currentDot.css({
            backgroundColor: "#fff"
        });
        //クリックされたドット位置とスライド位置を揃える
        slideCount = idname;
        $(".slideSet").stop(true).animate({
            left: slideCount * -slideWidth
        });
    });

    //ドットの色
    function dotColor(){ //currentDot→slideCount
        if(slideCount > slideNum){
            currentDot = $(`.dot#${idname-5}`);
        }else if(slideCount == 0){
            currentDot = $(`.dot#5`);
        }else{
            currentDot = $(`.dot#${idname}`);

        }
        $(".dot").css({
            backgroundColor: "#333"
        });
        currentDot.css({
            backgroundColor: "#fff"
        });
    }


    //変数slidingにアニメーション効果を格納
    function sliding() {
        var duration = 500;

            //スライドの移動処理
            $(".slideSet").stop(true).animate({
                left: slideCount * -slideWidth
            },duration,function() {
                clickFlag = true;
            });
            console.log("reset" + slideCount);

            
            //slideCountが1以下だった場合
            if(slideCount < 1){
                //スライド1枚目から6枚目に移動(アニメーション0秒)
                slideCount = 5;
                console.log(slideCount);
                delayedCall(0.5,function(){
                    $(".slideSet").animate({
                        left: slideCount * -slideWidth
                    },0);
                });

                //slideCountがslideNum上限に差し掛かった場合
                }else if(slideCount == slideNum){
                    console.log("next"+slideCount);
                    slideCount = 0;
                    delayedCall(0.5,function(){
                        $(".slideSet").animate({
                            left: slideCount * -slideWidth
                        },0);
                    });
                }
        function delayedCall(second, callBack){
            setTimeout(callBack, second * 1000);
        }
    }

    //nextボタン押下でsliding実行
    function sliderNext(){
        $(".slider-next").click(function(){
            if(clickFlag){
                clickFlag = false;
                slideCount++;
                sliding();
                idname = slideCount;
                dotColor();
            }else{
                return false;
            }
        });
    }
    //prevボタン押下でsliding実行
    function sliderPrev(){
        $(".slider-prev").click(function(){
            if(clickFlag){
                clickFlag = false;
                slideCount--;
                sliding();
                idname = slideCount;
                dotColor();
            }else{
                return false;
            }
        });
    }

    function init() {
        cloneSlide();
        sliding();
    }
    init();
    //イベント発火
    sliderNext();
    sliderPrev();
});
