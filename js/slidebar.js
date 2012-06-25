

(function($,window,undefined){
	var slideBar = function(elem, options){
		this.$elem = $(elem);

		this.init(options);
	};

	slideBar.prototype = {
		
		defaults: {
			width: 10,
			borderWidth: 1
		},

		init: function(options){
			this.config = $.extend({}, this.defaults, options);
			this.bar();
		},

		bar: function(){
			var width = this.$elem.width();
			var height = this.$elem.outerHeight();
			var widthBar = this.config.width - this.config.borderWidth;
			this.$elem.wrapInner('<div class="sb_inner_wrap"/>');
			var display = (parseInt($('.sb_inner_wrap', this.$elem).height()) <= height) ? "none" : "block";
			var heightBar = height*100/parseInt($('.sb_inner_wrap', this.$elem).height());
			var $html = $('<div class="sb_wrap" style="height: '+height+'px; width: '+widthBar+'px; display: '+display+'"><div class="sb_bar"></div></div>');
			var $bar = $('.sb_bar', $html);

			$bar.css({
				width: widthBar,
				height: heightBar+'%'
			});

			this.drag($html, heightBar);

			var paddingContainer = parseInt(this.$elem.css('padding-right'));
			this.$elem.css({
				overflow: 'hidden',
				paddingRight: this.config.width+paddingContainer+'px',
				position: 'relative'
			});
			this.$elem.append($html);
		},

		drag: function($html, heightBar){
			$html.mousedown(function(){
				$(this).bind('mousemove', function(e){
					var mouseY = e.pageY;
					$('.sb_bar', $html).css('top', (mouseY - heightBar/2)+'px');

					console.log(mouseY - heightBar/2);	
				});
			});

			$html.mouseup(function(){
				$(this).unbind('mousemove');
			});
		}		
	};

	$.fn.slidebar = function(opciones) {
      
        $.each(this, function(){
        	
            if(typeof opciones == "string") {
            	metodo = opciones;
                args = Array.prototype.slice.call(arguments, 1);

                var sb_slideBar = $(this).data('sb_slideBar') ?
                    $(this).data('sb_slideBar') : 
                    new slideBar(this);
                
                if(sb_slideBar[metodo]) {
                    sb_slideBar[metodo].apply(sb_slideBar, args);    
                }
            } else if(typeof opciones == 'object' || !opciones) {
                $(this).data('sb_slideBar', new slideBar(this, opciones));
            } else {
                $.error('Error, parámetro pasado es incorrecto');
            }
            return this;
        });
    }

    //window.slideBar = slideBar;
})(jQuery, window);

$(function(){
	$('.content').slidebar();
});