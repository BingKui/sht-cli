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

const template = require('./template.js');

module.exports = function (args) {
    const question = [{
        type: 'input',
        name: 'file',
        message: '请输入文件名称（如：index）:',
    }, {
        type: 'input',
        name: 'name',
        message: '请输入网页名称（如：首页）:',
    }];
    // 执行问题询问
    inquirer.prompt(question).then(function (answers) {
        const fileName = answers.file;
        const pageName = answers.name;
        // 判断是否文件已经存在，不存在创建，存在报错
        if (false) {
            return;
        }
        // html
        try {
            fs.writeFileSync(`./view/${fileName}.html`, template.htmlFile({ name: fileName, title: pageName }), 'utf8');
            console.log(chalk.green(`创建 ${pageName} 页面 html 文件成功。`));
        } catch (e) {
            console.log(e);
        }
        // js
        try {
            fs.writeFileSync(`./js/${fileName}.js`, template.jsFile({ name: pageName }), 'utf8');
            console.log(chalk.green(`创建 ${pageName} 页面 js 文件成功。`));
        } catch (e) {
            console.log(e);
        }
        // less
        try {
            fs.writeFileSync(`./less/${fileName}.less`, template.lessFile({ name: fileName }), 'utf8');
            console.log(chalk.green(`创建 ${pageName} 页面 less 文件成功。`));
        } catch (e) {
            console.log(e);
        }
    });
}
