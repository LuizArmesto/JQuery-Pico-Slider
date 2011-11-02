/*
 * jQuery Pico Slider v0.1
 * https://github.com/LuizArmesto/JQuery-Pico-Slider
 *
 * Copyright 2011, Luiz Armesto
 * Dual licensed under the MIT or GPL Version 2 licenses, just like jQuery itself.
 * 
 * November 2011
 */
 (function($) {
    Slider = function(element, args) {
        var me = $(element);
        var effect = args["effect"];
        var animTime = args["animSpeed"];
        this.pauseTime = args["pauseTime"];
        var pauseOnMouseOver = args["pauseOnMouseOver"];
        var showControls = args["showControls"];
     
        var slides = me.children()
        slides.css("position", "absolute");
        slides.css("top", "0px");
        slides.slice(1).hide()
        
        var current = 0;
        this.showNext = function() {
            var next = current + 1;
            if (current == slides.length - 1) { 
                next = 0;
            }

            var slide = $(slides[current]);
            var next_slide = $(slides[next]);
            
            next_slide.zIndex(1000);
            slide.zIndex(1001);
            next_slide.show();
            slide.fadeOut(animTime)
            
            current++;
            if (current >= slides.length) { 
                current = 0;
            }
        }
        
        this.showPrev = function() {
            var prev = current - 1;
            if (current == 0) { 
                prev = slides.length - 1;
            }

            if (window.console) console.log(me);
            var slide = $(slides[current]);
            var prev_slide = $(slides[prev]);
            
            prev_slide.zIndex(1000);
            slide.zIndex(1001);
            prev_slide.show();
            slide.fadeOut(animTime)
            
            current--;
            if (current < 0) { 
                current = slides.length - 1;
            }
        }
        				            
        this.flip = function() {
            this.showNext();
        }
        
        this.timer = setInterval(this.showNext, this.pauseTime);
        this.paused = false;
        
        if (pauseOnMouseOver) {
            me.hover(
                function() {
                    var slider = $(this).data('picoslider');
                    slider.paused = true;
                    clearInterval(slider.timer);
                },
                function() {
                    var slider = $(this).data('picoslider');
                    if (slider.paused) {
                        slider.timer = setInterval(slider.showNext, slider.pauseTime);
                        slider.paused = false;
                    }
                }
            );
        }
        
        var nextNav = $("<div>");
        var prevNav = $("<div>");
        nextNav.addClass("nextNav");
        prevNav.addClass("prevNav");
        me.append(nextNav);
        me.append(prevNav);
        $(".nextNav", me).live("click", this.showNext);
        $(".prevNav", me).live("click", this.showPrev);
        
    }
        
    $.fn.picoSlider = function(args) {
        return this.each(function(key, value){
            var element = $(this);
            var slider = new Slider(element, args);
            element.data("picoslider", slider);
        });			        
    }
    
})(jQuery);
