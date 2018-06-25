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

export function getPastNWeeks(n) {
    var mondays = []
    var thisMonday = getStartOfCurrentWeek()
    for (var i = 1 - n; i <= 0; i++) {
        mondays.push(date.addDays(thisMonday, i * 7))
    }
    return mondays.map(monday => {
        var week = []
        for (var i = 0; i < 7; i++) {
            week.push(date.addDays(monday, i))
        }
        return week
    })
}

function getStartOfCurrentWeek() {
    const today = new Date()
    const dayOfWeek = date.format(today, 'dddd')
    const daysAsNumbers = {
        'Monday': 0,
        'Tuesday': -1,
        'Wednesday': -2,
        'Thursday': -3,
        'Friday': -4,
        'Saturday': -5,
        'Sunday': -6
    }
    return date.addDays(today, daysAsNumbers[dayOfWeek])
}

export function getDayOfMonth(day) {
    return date.format(day, 'D')
}