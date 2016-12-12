# DraftJS: Import Markdown to ContentState

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will convert Markdown to editor content.

It was extracted from [React-RTE](https://react-rte.org) and placed into a separate module for more general use. Hopefully it can be helpful in your projects.

## Installation

    npm install --save draft-js-import-markdown

## How to Use

    import {stateFromMarkdown} from 'draft-js-import-markdown';
    let contentState = stateFromMarkdown(markdown);

It is possible to add custom configuration to the parser by setting options:

    const opts = {
      // options for marked.js markdown parser, see
      // https://github.com/greybyte/marked#options-1
      marked: {
        gfm: false
      },
      // options for draft-js-import-element, see
      // https://github.com/sstur/draft-js-import-element#options
      sfe: {
        customBlockFn: function(element) { ... },
        elementStyles: {
          'sup': 'SUPERSCRIPT'
        }
      }
    }
    let contentState = stateFromMarkdown(markdown, opts);

This project is still under development. If you want to help out, please open an issue to discuss or join us on [Slack](https://draftjs.slack.com/).


## License

This software is [ISC Licensed](/LICENSE).
