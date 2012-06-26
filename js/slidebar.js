(function($,window,undefined){
	var slideBar = function(elem, options){
		this.$elem = $(elem);

		this.init(options);
	};

	slideBar.prototype = {
		
		defaults: {
			width: 15,
			borderWidth: 1
		},

		init: function(options){
			this.config = $.extend({}, this.defaults, options);
			this.bar();

			$('body').height($(window).height());
		},

		bar: function(){
			var width = this.$elem.width();
			var height = this.$elem.outerHeight();
			var widthBar = this.config.width - this.config.borderWidth;
			this.$elem.wrapInner('<div class="sb_inner_wrap"/>');
			var display = (parseInt($('.sb_inner_wrap', this.$elem).height()) <= height) ? "none" : "block";
			var heightBar = parseInt(height* height/parseInt($('.sb_inner_wrap', this.$elem).height()));

			var $html = $('<div class="sb_wrap" style="height: '+height+'px; width: '+widthBar+'px; display: '+display+'"><div class="sb_bar"></div></div>');
			var $bar = $('.sb_bar', $html);

			$bar.css({
				width: widthBar,
				height: heightBar+'px'
			});

			this.drag($html, heightBar, height);

			var paddingContainer = parseInt(this.$elem.css('padding-right'));
			this.$elem.css({
				overflow: 'hidden',
				paddingRight: this.config.width+paddingContainer+'px',
				position: 'relative'
			});
			this.$elem.append($html);
		},

		drag: function($html, heightBar, height){
			var sb = this;
			var position = this.$elem.position();
			var width = this.$elem.outerWidth();
			var marginTop = parseInt(sb.$elem.css('margin-top'));
			var marginLeft = parseInt(sb.$elem.css('margin-left'));

			$html.mousedown(function(e){
				var mouseY = e.pageY - position.top - marginTop;
				var barPos = (mouseY <= heightBar/2) ? 0 : (mouseY >= (height - heightBar/2)) ? (height - heightBar) : (mouseY - heightBar/2);
				$('.sb_bar', $html).css('top', barPos+'px');

				sb.$elem.bind('mousemove', function(e){
					//e.stopPropagation();
					
					var mouseY = e.pageY - position.top - marginTop;
					var barPos = (mouseY <= heightBar/2) ? 0 : (mouseY >= (height - heightBar/2)) ? (height - heightBar) : (mouseY - heightBar/2);

					//console.log("Y="+barPos);
					 $('.sb_bar', $html).css('top', barPos+'px');

					var mouseX = e.pageX - position.left - marginLeft;
					/*console.log("X="+mouseX);
					console.log("mouseY="+mouseY);
					console.log("Height="+height);
					console.log("PosicionTop="+position.top);*/
					if (mouseY <= 1  || mouseY >= (height - 1) || mouseX <= 1) {
						$(this).unbind('mousemove');
					};
				});
			});

			sb.$elem.mouseup(function(){
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
	$('body, .content').slidebar();
});