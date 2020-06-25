$(function () {

    //即時間数
    (function () {

        var slideWidth = $('.slide').outerWidth(); // .slideの幅を取得して代入
        var slideNum = $('.slide').length;  // .slideの数を取得して代入
        var slideCount = 0;  //slideの現在地
        var indicator = $(".indicator");
        var indicatorHTML = "";
        var dotIndex = 0;


        var slideSetWidth = slideWidth * slideNum; // .slideの幅×数で求めた値を代入
        $('.slideSet').css('width', slideSetWidth); // .slideSetのCSSにwidth: slideSetWidthを指定

        //インジケーターの生成
        $(".slide").each(function (slideNum){
            indicator.css({
                top: 420 + "px"
            });
            indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
            indicator.html(indicatorHTML);
            dotIndex++;
        });

        //インジケーター初期位置
        $(".dot#0").css({
            backgroundColor: "#fff"
        });

        //インジケーター
        $(".dot").click(function(){

            //クリックされたドットの特定
            var idname = $(this).attr("id"),
            currentDot = $(`.dot#${idname}`);
            //クリックされたドットのCSS改変
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


        //変数slidingにアニメーション効果を格納
        var sliding = function() {
            //slideCountが0以下だった場合 0~4
            if(slideCount < 0){
                slideCount = slideNum -1;

            //slideNumが上限以上だった場合
            }else if(slideCount > slideNum -1){
                slideCount = 0;
            }
            //スライドの移動処理
            $(".slideSet").stop(true).animate({
                left: slideCount * -slideWidth
            });
        }

        //nextボタン押下でsliding実行
        $(".slider-next").click(function(){
            slideCount++;
            sliding();
            idname = slideCount;
            currentDot = $(`.dot#${idname}`);
            $(".dot").css({
                backgroundColor: "#333"
            });
            currentDot.css({
                backgroundColor: "#fff"
            });
        });
    
        //prevボタン押下でsliding実行
        $(".slider-prev").click(function(){
            slideCount--;
            sliding();
            idname = slideCount;
            currentDot = $(`.dot#${idname}`);
            $(".dot").css({
                backgroundColor: "#333"
            });
            currentDot.css({
                backgroundColor: "#fff"
            });
        });

    }());


});
