var $ = require('jquery');

$(function(){
	var slideWapper = $('#touch_slide');
	var layer = $('#touch_layer');
	var allWidth = slideWapper.width();
	var panels = slideWapper.find('li').length;
	var panelPar = Math.floor(allWidth / panels);
	var panelSizesPlus = [0];
	var panelSizesMinus = [0];
	var nowPositionX = 0;
	var diffPositionX = 0;
	var setPoint = 0;


	nnn(setPoint);

	function nnn(i) {
		slideWapper.find('li').removeClass('ac').hide();
		slideWapper.find('li').eq(i).show().addClass('ac');
		setPoint = i;
	}

	layer.on('touchstart', function() {
		this.pageX = event.changedTouches[0].pageX; // X 座標の位置
		nowPositionX = this.pageX;
	});

	layer.on('touchmove', function() {
		diffPositionX = event.changedTouches[0].pageX - nowPositionX+(panelPar/2);
		if(diffPositionX > 0 && Math.floor(diffPositionX / panelPar) < panels) {
			//console.log(Math.floor(diffPositionX / panelPar));
			nnn(Math.floor(diffPositionX / panelPar));
			//diffCheck('plus',panelSizesPlus,diffPositionX);
		} else if(diffPositionX < 0  && Math.floor(diffPositionX / panelPar) >= -panels) {
			//console.log(Math.floor(diffPositionX / panelPar)+panels);
			nnn(Math.floor(diffPositionX / panelPar)+panels);
			//diffCheck('minus',panelSizesMinus,diffPositionX);
		}
	});


	layer.on('touchend', function() {
		//console.log(setPoint);
		var listItem = [];
		var unSelectItem = [];

		slideWapper.find('li').each(function(e){
			if(e >= setPoint) {
				listItem[e-setPoint] = $(this).html();
			}
			else{
				unSelectItem[e] = $(this).html();
			}
		});

		var allItem = $.merge( listItem, unSelectItem )

		//console.log(allItem);

		slideWapper.find('li').each(function(e){
			$(this).html(allItem[e]);
			nnn(0);
		});


	});

});
