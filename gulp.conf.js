"use strict";

module.exports = {
  paths: {
    index: ['./src/index.html'],
    ts: ['./src/**/*.ts', './typings/**/*.ts'],
    cmptRsrc: ['./src/app/**/*.{html,css}'],
    tsConfig: './tsconfig.json',
    assets: ['./src/assets/**'],
    staticFiles: [
      './src/global.css',
      './src/systemjs.config.js'
    ],

    dist: './build'
  },
  inlineTemplate: {
    base: '/src',
    target: 'es6',
    indent: 0,
    useRelativePaths: true,
    removeLineBreaks: false,
    templateExtension: '.html',
    templateFunction: false,
    // templateProcessor: function (path, ext, file, callback) {
    //   console.dir(arguments);
    // },
    // styleProcessor: function (path, ext, file, callback) {
    //
    // },
    // customFilePath: function (ext, file) {
    // },
    supportNonExistentFiles: false
  }
};