import {
  TextNode,
  ElementNode,
  FragmentNode,
  SELF_CLOSING,
} from 'synthetic-dom';


export class SyntheticDomRenderer {
  constructor(options) {
    this.options = Object.assign({'lang-prefix': 'lang-'}, options);
  }

  code(childNode, lang) {
    let attributes = [];
    if (lang) {
      attributes.push({name: 'class', value: this.options.langPrefix + lang});
    }
    let codeNode = new ElementNode('code', attributes, [childNode]);
    return new ElementNode('pre', [], [codeNode]);
  }

  blockquote(childNode) {
    return new ElementNode('blockquote', [], [childNode]);
  }

  heading(childNode, level) {
    return new ElementNode('h' + level, [], [childNode]);
  }

  hr() {
    return new ElementNode('hr', [], SELF_CLOSING);
  }

  list(childNode, isOrdered) {
    return new ElementNode(isOrdered ? 'ol' : 'ul', [], [childNode]);
  }

  listitem(childNode) {
    return new ElementNode('li', [], [childNode]);
  }

  paragraph(childNode) {
    return new ElementNode('p', [], [childNode]);
  }

  strong(childNode) {
    return new ElementNode('strong', [], [childNode]);
  }

  em(childNode) {
    return new ElementNode('em', [], [childNode]);
  }

  codespan(text) {
    return new ElementNode('code', [], [new TextNode(text)]);
  }

  br() {
    return new ElementNode('br', [], SELF_CLOSING);
  }

  del(childNode) {
    return new ElementNode('del', [], [childNode]);
  }

  ins(childNode) {
    return new ElementNode('ins', [], [childNode]);
  }

  link(href, title, childNode) {
    let attributes = [{name: 'href', value: href}];
    if (title) {
      attributes.push({name: 'title', value: title});
    }
    return new ElementNode('a', attributes, [childNode]);
  }

  image(href, title, alt) {
    let attributes = [{name: 'src', value: href}];
    if (title) {
      attributes.push({name: 'title', value: title});
    }
    if (alt) {
      attributes.push({name: 'alt', value: alt});
    }
    return new ElementNode('img', attributes, SELF_CLOSING);
  }

  text(text) {
    return new TextNode(text);
  }

  plugin(plugin, params, block) {
    // plugins are mapped to <figure>, which is somewhat semantically
    // correct, at least in most cases
    let attributes = [{name: 'type', value: plugin},
                      {name: 'params', value: params}];
    if (block) {
      return new ElementNode('figure', attributes, [new TextNode(block)]);
    } else {
      // block is empty, include SOFT_BREAK_PLACEHOLDER so it does not
      // get discarded
      return new ElementNode('figure', attributes, [new TextNode('\u200B')]);
    }
  }

  start() {
    return new FragmentNode();
  }

  add(out, fragment) {
    if (typeof fragment === 'string') {
      out.appendChild(new TextNode(fragment));
    } else {
      out.appendChild(fragment);
    }
    return out;
  }
}
