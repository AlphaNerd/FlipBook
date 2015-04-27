$(document).ready(function(){
    console.log("Success");
    var totalPages = $("#book").attr("total-pages");
    var vidPage = $("#book").attr("vid-page");
    var controls = $("#book").attr("controls");
    var logo_en = "en/logo.png";
    var logo_fr = "fr/logo.png";
    var footer = $("#book").attr("credits");
    /////// Language Check //////////
    var language = window.navigator.userLanguage || window.navigator.language;
    console.log(language);
    if (language == "en-US"){
        buildDOM(totalPages,vidPage,"en"); ///// (totalPages,languageSelect,videoPage) ////
    }
    if (language == "fr-FR"){
        buildDOM(totalPages,vidPage,"fr");
    }
    //// KEYBOARD NAVIGATION ///
    $('body').keyup(function (event) {
      console.log("Key code: "+event.keyCode);
      if (event.keyCode == 37){
        console.log("Prev Page");
        $("#book").turn("previous");
        console.log($("#book").turn("page"));
      }
      if (event.keyCode == 39){
        console.log("Next Page");
        $("#book").turn("next");
        console.log($("#book").turn("page"));
      }
    });
    $(".nav-button.left").on("click",function(){
        $("#book").turn("previous");
    });
    $(".nav-button.right").on("click",function(){
        $("#book").turn("next");
    });
    function addControls(){
        $("#book").after("<div class='nav-button left'></div>")
        $("#book").after("<div class='nav-button right'></div>")
    }
    //////////////////////////////////
    function buildDOM(pages,vidPage,lang){
        language == "en-US" ? $("#book").before("<div class='logo'><img src='"+logo_en+"'/></div>") : $("#book").before("<div class='logo_fr'><img src='"+logo+"'/></div>")
        footer != null ? $("#book").after("<div class='credit'>"+footer+"</div>") : null;
        controls != false ? addControls() : null;
        for (i=0;i<pages;i++){
            if (i == vidPage && vidPage != 0){
                $("#book").append("<div class='page'><div class='video-container'><video controls><source src='"+lang+"/web_vid_"+lang+".mov' type='video/mp4'>Your browser does not support HTML5 video.</video></div><img src='http://dev.alphanerdsmedia.com/report/"+lang+"/image67.jpg' alt='' /></div>");
            }else{
                $("#book").append("<div class='page'><img src='"+lang+"/image"+i+".jpg' alt=''/></div>");
            }
        }
        buildBook();
    }
    function buildBook() {
        'use strict';

        var module = {
            ratio: 1.38,
            init: function (id) {
                var me = this;

                // if older browser then don't run javascript
                if (document.addEventListener) {
                    this.el = document.getElementById(id);
                    this.resize();
                    this.plugins();

                    // on window resize, update the plugin size
                    window.addEventListener('resize', function (e) {
                        var size = me.resize();
                        $(me.el).turn('size', size.width, size.height);
                        $("#logo-container").width(size.width);
                    });
                }
            },
            resize: function () {
                // reset the width and height to the css defaults
                this.el.style.width = '';
                this.el.style.height = '';

                var width = this.el.clientWidth,
                    height = Math.round(width / this.ratio),
                    padded = Math.round(document.body.clientHeight * 0.8);

                // if the height is too big for the window, constrain it
                if (height > padded) {
                    height = padded;
                    width = Math.round(height * this.ratio);
                }

                // set the width and height matching the aspect ratio
                this.el.style.width = width + 'px';
                this.el.style.height = height + 'px';

                var pos = $("#book").offset();
                $(".logo").css("margin-left",pos.left);

                return {
                    width: width,
                    height: height
                };
            },
            plugins: function () {
                // run the plugin
                $(this.el).turn({
                    gradients: true,
                    acceleration: true
                });
                // hide the body overflow
                document.body.className = 'hide-overflow';
            }
        };

        module.init('book');
    };
});