/* @flow */
import {SyntheticDomRenderer} from './SyntheticDomRenderer';

import {stateFromElement} from 'draft-js-import-element';
import type {ContentState} from 'draft-js';
import {convertToRaw} from 'draft-js';
import {ElementNode} from 'synthetic-dom';
let marked = require('marked');

type StateFromMarkdownOpts = {marked: Object, sfe: Object};

export function stateFromMarkdown(markdown: string,
                                  options?: StateFromMarkdownOpts): ContentState {
  const parserDefaultOpts = {
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: false,
    silent: false,
    tables: false, // not supported yet
    renderer: new SyntheticDomRenderer({
      langPrefix: 'lang-'},
      { /* plugins */ }
    ),
    xhtml: false,
  };
  const parserOpts = Object.assign({}, parserDefaultOpts, (options)
                                                          ? options.marked
                                                          : {});
  let fragment = marked.parse(markdown, parserOpts);
  const sfeOpts = Object.assign({}, (options)
                                    ? options.sfe
                                    : {});
  return stateFromElement(new ElementNode('body', [], [fragment]), sfeOpts);
}

export default stateFromMarkdown; // for backwards compat only

export function rawFromMarkdown(markdown: string,
                                options?: StateFromMarkdownOpts): ContentState {
  return convertToRaw(stateFromMarkdown(markdown, options));
}
