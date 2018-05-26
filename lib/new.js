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
            console.log('use npm: ' + npms[i]);
            return npms[i];
        } catch (e) {

        }
    }
    throw new Error('please install npm');
}

module.exports = function (args) {

    const autoInstall = !(args[3] === '--no-auto-install');

    const questions = [{
        type: 'input',
        name: 'name',
        message: 'input project name:',
    }, {
        type: 'input',
        name: 'path',
        message: 'which directory do you want to init to ? (default is current directory ./):',
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
            console.log(chalk.red('exit: directory is already exists'));
            return;
        }
        // 定义加载中的提示信息
        const spinner = ora('downloading template...');
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
                console.log(chalk.red(`Failed to download repo https://github.com/${origin}${branch[newType]}`, err));
            } else {
                // 下载成功
                console.log(chalk.green(`Success to download repo https://github.com/${origin}${branch[newType]} to ${targetPath}`));
                // 不自动安装依赖，直接返回
                if (!autoInstall) {
                    return;
                }
                // 定义自动安装依赖时的提示信息
                const spinnerInstall = ora('Auto installing...');
                spinnerInstall.start();

                const npm = findNpm();
                // 通过 shell 进入项目目录进行安装依赖
                shell.exec(`cd ${path.join(targetPath, projectName)} && ${npm} install`, function () {
                    console.log(chalk.green(npm + ' install end'));
                    spinnerInstall.stop();
                    console.log('Visit https://github.com/BingKui/static-html-template to learn more.');
                });
            }
        })
    });
};