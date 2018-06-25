import { formatAsString, parseFromString } from './date'

export const HabitState = {
    NOT_ACTIVE: 'habit_state_not_active',
    DONE: 'habit_state_done',
    NOT_DONE: 'habit_state_not_done'
}

export function getHabitStateOnDay(habit, day) {
    const startDate = parseFromString(habit.start_date)
    const today = new Date()

    if (day.getTime() - startDate.getTime() <= 0) {
        return HabitState.NOT_ACTIVE
    }

    if (day.getTime() > today.getTime()) {
        return HabitState.NOT_ACTIVE
    }

    if (_.some(habit.events, event => event.date === formatAsString(day))) {
        return HabitState.DONE
    }

    return HabitState.NOT_DONE
}