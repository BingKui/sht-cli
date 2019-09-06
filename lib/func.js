const { swiperCss, swiperJs, normalSwiperHtml, normalSwiperJs } = require('../template/swiper');
const { tabbarHtml, tabbarLess } = require('../template/tabbar');
var lessFile = function (props) {
    const { template } = props;
    const haveTabbar = `${template}`.indexOf('tabbar') > -1;
    return `// 引入配置文件
@import "../config/index.less";
${haveTabbar ? tabbarLess : ''}
`;
}
var htmlFile = function (props) {
    const { template } = props;
    const haveSwiper = `${template}`.indexOf('swiper') > -1;
    const haveTabbar = `${template}`.indexOf('tabbar') > -1;
    const html = `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="keywords" content="网站关键词"/>
        <meta name="description" content="网站描述"/>
        <title>${props.title}</title>
        <!-- 引入样式 -->
        ${haveSwiper ? swiperCss : ''}
        <link rel="stylesheet" href="../style/base.css">
        <link rel="stylesheet" href="../style/${props.name}.css">
    </head>
    <body>
        <div class="v-${props.name}">
            <!-- 当前页面内容 -->
            ${haveSwiper ? normalSwiperHtml : ''}
        </div>
        ${haveTabbar ? tabbarHtml : ''}
    </body>
    ${haveSwiper ? swiperJs : ''}
    <script src="../js/${props.name}.js"></script>
</html>
`;
    return html;
}
var jsFile = function (props) {
    const { template } = props;
    const haveSwiper = `${template}`.indexOf('swiper') > -1;
    return `// ${props.name} 页面js
${haveSwiper ? normalSwiperJs : ''}
`;
}

module.exports = {
    lessFile: lessFile,
    htmlFile: htmlFile,
    jsFile: jsFile,
};