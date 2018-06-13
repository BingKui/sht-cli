var lessFile = function (props) {
    return `// 引入配置文件
@import "../config/index.less";
    `;
}
var htmlFile = function (props) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keywords" content="网站关键词"/>
    <meta name="description" content="网站描述"/>
    <title>${props.title}</title>
    <!-- 引入样式 -->
    <link rel="stylesheet" href="../style/base.css">
    <link rel="stylesheet" href="../style/${props.name}.css">
</head>
<body>
    
</body>
<script src="../js/${props.name}.js"></script>
</html>`;
}
var jsFile = function (props) {
    return `// ${props.name} 页面js`;
}

module.exports = {
    lessFile: lessFile,
    htmlFile: htmlFile,
    jsFile: jsFile,
};