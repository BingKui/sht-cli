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
// git库下载工具
const download = require('download-git-repo');
// 系统资源查找库
const which = require('which');
// node 原生文件操作方法
const exists = require('fs').existsSync;

const npms = ['tnpm', 'cnpm', 'npm'];

const logger = require('./logger');

const cwd = process.cwd();
// 定义来源
const origin = 'BingKui/static-html-template';
const branch = {
    standard: '#master',
    simple: '#simple',
    'browser history simple': '#browser-history-simple',
};

// 查找可使用的 npm 类型
function findNpm() {
    for (var i = 0; i < npms.length; i++) {
        try {
            which.sync(npms[i]);
            logger.infoTip('安装工具', '使用: ' + npms[i]);
            return npms[i];
        } catch (e) {

        }
    }
    throw new Error('请先安装 npm');
}

module.exports = function (args) {

    const autoInstall = !(args[3] === '--no-auto-install');

    const questions = [{
        type: 'input',
        name: 'name',
        message: '输入你的项目名称:',
    }, {
        type: 'input',
        name: 'path',
        message: '初始化到那个目录？(默认目录 ./ ):',
    }];

    const newType = 'standard';

    inquirer.prompt(questions).then(function (answers) {
        // 接收输入的项目名称
        const projectName = answers.name || 'sht-template';
        // 重新定义项目的地址
        const targetPath = path.join(cwd, answers.path || './');
        // 检测路径是否存在
        if (exists(path.join(targetPath, projectName))) {
            // 存在，直接输入错误信息，并返回
            logger.errorTip('创建出错', 'exit: 目录已经存在');
            return;
        }
        // 定义加载中的提示信息
        const spinner = ora('下载模板...');
        // 开始执行loading
        spinner.start();
        // 下载项目
        download(`${origin}${branch[newType]}`, path.join(targetPath, projectName), {
            clone: false
        }, function (err) {
            // 关闭loading
            spinner.stop();
            if (err) {
                // 出现错误
                logger.errorTip('下载出错', `未能下载 https://github.com/${origin}${branch[newType]}`, err);
            } else {
                // 下载成功
                logger.successTip('下载成功', `下载成功 https://github.com/${origin}${branch[newType]} 到 ${targetPath}`);
                // 不自动安装依赖，直接返回
                if (!autoInstall) {
                    return;
                }
                // 定义自动安装依赖时的提示信息
                const spinnerInstall = ora('自动安装...');
                spinnerInstall.start();

                const npm = findNpm();
                // 通过 shell 进入项目目录进行安装依赖
                shell.exec(`cd ${path.join(targetPath, projectName)} && ${npm} install`, function () {
                    logger.successTip('安装完成', npm);
                    spinnerInstall.stop();
                    logger.info('查看 https://github.com/BingKui/static-html-template 了解更多。');
                });
            }
        })
    });
};