const path = require('path');
const chalk = require('chalk');
// fs 扩展库
const fs = require('fs-extra');
// 命令行库
const shell = require('shelljs');
// 交互式命令界面
const inquirer = require('inquirer');
// 命令行loading工具
const ora = require('ora');

const logger = require('./logger');

const { htmlFile, jsFile, lessFile } = require('./func.js');

module.exports = function (args) {
    const question = [{
        type: 'input',
        name: 'file',
        message: '请输入文件名称（如：index）:',
    }, {
        type: 'input',
        name: 'name',
        message: '请输入网页名称（如：首页）:',
    }, {
        type: 'checkbox',
        name: 'template',
        message: '选择需要添加到页面的模板（默认空）:',
        choices: [{
            name: 'swiper轮播图',
            value: 'swiper',
            short: '轮播图',
        }, {
            name: 'tabbar底部导航',
            value: 'tabbar',
            short: '底部导航',
        }],
    }];
    // 执行问题询问
    inquirer.prompt(question).then(function (answers) {
        const fileName = answers.file;
        const pageName = answers.name;
        const template = answers.template;
        // 判断是否文件已经存在，不存在创建，存在报错
        if (false) {
            return;
        }
        // html
        try {
            fs.writeFileSync(`./view/${fileName}.html`, htmlFile({ name: fileName, title: pageName, template }), 'utf8');
            logger.success(`创建 ${pageName} 页面 html 文件成功。`);
        } catch (e) {
            logger.errorTip('创建HTML文件失败', e);
        }
        // js
        try {
            fs.writeFileSync(`./js/${fileName}.js`, jsFile({ name: pageName, template }), 'utf8');
            logger.success(`创建 ${pageName} 页面 js 文件成功。`);
        } catch (e) {
            logger.errorTip('创建JavaScript文件失败', e);
        }
        // less
        try {
            fs.writeFileSync(`./less/${fileName}.less`, lessFile({ name: fileName, template }), 'utf8');
            logger.success(`创建 ${pageName} 页面 less 文件成功。`);
        } catch (e) {
            logger.errorTip('创建Less文件失败', e);
        }
    });
}
