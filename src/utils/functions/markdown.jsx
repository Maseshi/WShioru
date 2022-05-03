import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

export const markdown = (file) => {
    const markdown = new MarkdownIt({
        html: true,
        xhtmlOut: true,
        breaks: true,
        linkify: true,
        highlight: (str, lang) => {
            if (lang && HighlightJs.getLanguage(lang)) {
                try {
                    return HighlightJs.highlight(str, { language: lang }).value
                } catch (__) {

                }
            }

            return ''
        }
    })

    markdown.renderer.rules.table_open = () => {
        return '<table class="table">'
    }

    markdown.renderer.rules.blockquote_open = () => {
        return '<blockquote class="blockquote">'
    }

    return markdown.render(file)
}