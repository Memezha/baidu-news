(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);
	//轮播图
new Swiper('.swiper-container',{
	loop:true, 							//无限循环/无缝滚动
//	spaceBetween:10,					//间距
//	prevButton:'.swiper-button-prev',	//上一个
//	nextButton:'.swiper-button-next',	//下一个
//	pagination:'.swiper-pagination',	//生成小圆点
	paginationClickable:true,			//小圆点可点击
	autoplay:1000, 						//自动播放
	autoplayDisableOnInteraction:false	//点击停止一下播放
});
