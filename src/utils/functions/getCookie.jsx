export const getCookie = (name) => {
    let key = name + '='
    let values = document.cookie.split(';')
    
    for (let i = 0; i < values.length; i++) {
        let value = values[i]

        while (value.charAt(0) === ' ') value = value.substring(1, value.length)

        if (value.indexOf(key) === 0) return value.substring(key.length, value.length)
    }

    return null
}