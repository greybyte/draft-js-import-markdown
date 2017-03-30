'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateFromMarkdown = stateFromMarkdown;
exports.rawFromMarkdown = rawFromMarkdown;

var _SyntheticDomRenderer = require('./SyntheticDomRenderer');

var _draftJsImportElement = require('draft-js-import-element');

var _draftJs = require('draft-js');

var _syntheticDom = require('synthetic-dom');

var marked = require('marked');

function stateFromMarkdown(markdown, options) {
  var parserDefaultOpts = {
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: false,
    silent: false,
    tables: false, // not supported yet
    renderer: new _SyntheticDomRenderer.SyntheticDomRenderer(),
    xhtml: false
  };
  var parserOpts = Object.assign({}, parserDefaultOpts, options ? options.marked : {});
  var fragment = marked.parse(markdown, parserOpts);
  var sfeOpts = Object.assign({}, options ? options.sfe : {});
  return (0, _draftJsImportElement.stateFromElement)(new _syntheticDom.ElementNode('body', [], [fragment]), sfeOpts);
}

exports.default = stateFromMarkdown; // for backwards compat only

function rawFromMarkdown(markdown, options) {
  return (0, _draftJs.convertToRaw)(stateFromMarkdown(markdown, options));
}