import date from 'date-and-time'

const DATE_FORMAT = 'YYYY-MM-DD'

export function formatAsString(day) {
    return date.format(day, DATE_FORMAT)
}

export function parseFromString(string) {
    return date.parse(string, DATE_FORMAT)
}

export function shorthandFormat(day) {
    return date.format(day, 'ddd D')
}

export function todaysDateAsString() {
    return formatAsString(new Date())
}

export function getPastNDays(n) {
    const today = new Date()
    var ret = []
    for (var i = -n; i < 0; i++) {
        ret.push(date.addDays(today, i))
    }
    return ret
}