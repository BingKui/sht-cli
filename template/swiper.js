const swiperCss = '<link href="https://cdn.bootcss.com/Swiper/4.5.0/css/swiper.min.css" rel="stylesheet">';
const swiperJs = '<script src="https://cdn.bootcss.com/Swiper/4.5.0/js/swiper.min.js"></script>';

const normalSwiperHtml = `
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>`;

const normalSwiperJs = `
window.onload = function () {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项:'vertical'
        loop: true, // 循环模式选项
        speed: 300,
        autoplay : {
            delay:3000
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
}`;
module.exports = {
    swiperCss,
    swiperJs,
    normalSwiperHtml,
    normalSwiperJs,
};