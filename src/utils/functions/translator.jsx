import { getCookie } from './getCookie'

export const translator = () => {
    let language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language

    if (/^th\b/.test(language)) {
        language = 'th'
    } else if (/^en\b/.test(language)) {
        language = 'en'
    } else if (/^ja\b/.test(language)) {
        language = 'ja'
    } else {
        language = 'en'
    }

    return {
        code: language,
        translate: require('../../languages/' + language + '.json')
    }
}