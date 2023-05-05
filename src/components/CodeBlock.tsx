import {highlightTree, HighlightStyle, tags} from '@codemirror/highlight';
import {javascript} from '@codemirror/lang-javascript';
import {html} from '@codemirror/lang-html';
import {css} from '@codemirror/lang-css';
import rangeParser from 'parse-numeric-range';
import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode & {
    props: {
      className: string
      children?: string
      meta?: string
    }
  }
  onLineHover?: (lineNumber: number | null) => void
}
interface InlineHighlight {
  step: number;
  line: number;
  startColumn: number;
  endColumn: number;
}

const jsxLang = javascript({jsx: true, typescript: false})
const cssLang = css()
const htmlLang = html()

export function CodeBlockImpl({
  children: {
    props: { className = 'language-js', children: code = '', meta }
  },
  onLineHover
}: CodeBlockProps) {
  code = code.trimEnd()
  const lang = className === 'language-css' ? cssLang : className === 'language-html' ? htmlLang : jsxLang
  const tree = lang.language.parser.parse(code)
  const highlightTheme = getSyntaxHighlight()
  const tokenStarts = new Map()
  const tokenEnds = new Map()
  // highlightTree(tree, highlightTheme.match, (from, to, className) => {
  //   tokenStarts.set(from, className)
  //   tokenEnds.set(to, className)
  // })

  const highlightLines = new Map()
  const lineDecorators = getLineDecorators(meta)
  for(const decorator of lineDecorators) {
    highlightLines.set(decorator.line - 1, decorator.className)
  }

  const inlineDecorators = getInlineDecorators(code, meta)
  const decoratorStarts = new Map()
  const decoratorEnds = new Map()
  const lines = code.split('\n')
  for(const decorator of inlineDecorators) {
    // Find where inline highlight starts and ends.
    let decoratorStart = 0;
    for (let i = 0; i < decorator.line - 1; i++) {
      decoratorStart += lines[i].length + 1;
    }
    decoratorStart += decorator.startColumn;
    const decoratorEnd =
      decoratorStart + (decorator.endColumn - decorator.startColumn);
    if (decoratorStarts.has(decoratorStart)) {
      throw Error('Already opened decorator at ' + decoratorStart);
    }
    decoratorStarts.set(decoratorStart, decorator.className);
    if (decoratorEnds.has(decoratorEnd)) {
      throw Error('Already closed decorator at ' + decoratorEnd);
    }
    decoratorEnds.set(decoratorEnd, decorator.className);
  }

  const finalOutput = []
  finalOutput.push(<div className='cm-line'>first line</div>)
  finalOutput.push(<div className='cm-line'>secord line</div>)
  finalOutput.push(<div className='cm-line'>third line</div>)

  return (
    <div
      className='sandpack sandpack--codeblock rounded-2xl h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-none overflow-hidden bg-transparent'
      style={{contain: 'content'}}
    >
      <div className="sp-wrapper">
        <div className="sp-stack">
          <div className="sp-code-editor">
            <pre className="sp-cm sp-pristine sp-javascript flex align-start">
              <code
                className="sp-pre-placeholder grow-[2]"
                onMouseLeave={
                  onLineHover ? () => onLineHover(null) : undefined
                }>
                {finalOutput}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <CodeBlockImpl {...props} />
  )
}

function classNameToken(name: string): string {
  return `sp-syntax-${name}`;
}
function getSyntaxHighlight(): HighlightStyle {
  return HighlightStyle.define([
    {tag: tags.link, textdecorator: 'underline'},
    {tag: tags.emphasis, fontStyle: 'italic'},
    {tag: tags.strong, fontWeight: 'bold'},

    {
      tag: tags.keyword,
      class: classNameToken('keyword'),
    },
    {
      tag: [tags.atom, tags.number, tags.bool],
      class: classNameToken('static'),
    },
    {
      tag: tags.standard(tags.tagName),
      class: classNameToken('tag'),
    },
    {tag: tags.variableName, class: classNameToken('plain')},
    {
      // Highlight function call
      tag: tags.function(tags.variableName),
      class: classNameToken('definition'),
    },
    {
      // Highlight function definition differently (eg: functional component def in React)
      tag: [tags.definition(tags.function(tags.variableName)), tags.tagName],
      class: classNameToken('definition'),
    },
    {
      tag: tags.propertyName,
      class: classNameToken('property'),
    },
    {
      tag: [tags.literal, tags.inserted],
      class: classNameToken('string'),
    },
    {
      tag: tags.punctuation,
      class: classNameToken('punctuation'),
    },
    {
      tag: [tags.comment, tags.quote],
      class: classNameToken('comment'),
    },
  ])
}

function getLineDecorators(meta: string) {
  if(!meta) return []
  const linesToHighlight = getHighlightLines(meta)
  const highlightLineConfig = linesToHighlight.map(line => ({
    className: 'bg-github-highlight dark:bg-opacity-10',
    line
  }))
  return highlightLineConfig
}

/**
 *
 * @param meta string provided after the language in a markdown block
 * @returns array of lines to highlight
 * @example
 * ```js {1-3,7} [[1, 1, 20, 33], [2, 4, 4, 8]] App.js active
 * ...
 * ```
 *
 * -> The meta is `{1-3,7} [[1, 1, 20, 33], [2, 4, 4, 8]] App.js active`
 */
function getHighlightLines(meta: string): number[] {
  const HIGHLIGHT_REGEX = /{([\d,-]+)}/;
  const parsedMeta = HIGHLIGHT_REGEX.exec(meta);
  if (!parsedMeta) {
    return [];
  }
  return rangeParser(parsedMeta[1]);
}

function getInlineDecorators(code: string, meta: string): Array<{
  step: number
  line: number
  startColumn: number
  endColumn: number
  className: string
}> {
  if(!meta) return []
  const inlineHighlightLines = getInlineDecorators(meta, code)
  const inlineHighlightConfig = inlineHighlightLines?.map((line: InlineHighlight) => ({
    ...line,
    elementAttributes: { 'data-step': `${line.step}` },
    className: 'code-step bg-opacity-10 dark:bg-opacity-20 relative rounded px-1 py-[1.5px] border-b-[2px] border-opacity-60 bg-yellow-40 border-yellow-40 text-yellow-60 dark:text-yellow-30'
  }))
  return inlineHighlightConfig
}

/**
 *
 * @param meta string provided after the language in a markdown block
 * @returns InlineHighlight[]
 * @example
 * ```js {1-3,7} [[1, 1, 'count'], [2, 4, 'setCount']] App.js active
 * ...
 * ```
 *
 * -> The meta is `{1-3,7} [[1, 1, 'count', [2, 4, 'setCount']] App.js active`
 */
function getInlineHighlights(meta: string, code: string) {
  const INLINE_HEIGHT_REGEX = /(\[\[.*\]\])/;
  const parsedMeta = INLINE_HEIGHT_REGEX.exec(meta);
  if (!parsedMeta) {
    return [];
  }

  const lines = code.split('\n');
  const encodedHighlights = JSON.parse(parsedMeta[1]);
  return encodedHighlights.map(([step, lineNo, substr, fromIndex]: any[]) => {
    const line = lines[lineNo - 1];
    let index = line.indexOf(substr);
    const lastIndex = line.lastIndexOf(substr);
    if (index !== lastIndex) {
      if (fromIndex === undefined) {
        throw Error(
          "Found '" +
            substr +
            "' twice. Specify fromIndex as the fourth value in the tuple."
        );
      }
      index = line.indexOf(substr, fromIndex);
    }
    if (index === -1) {
      throw Error("Could not find: '" + substr + "'");
    }
    return {
      step,
      line: lineNo,
      startColumn: index,
      endColumn: index + substr.length,
    };
  });
}
