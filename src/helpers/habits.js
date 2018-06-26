import { formatAsString, parseFromString, isToday } from './date'

export const HabitState = {
    NOT_ACTIVE: 'habit_state_not_active',
    DONE: 'habit_state_done',
    NOT_DONE: 'habit_state_not_done',
    TODO_TODAY:'habit_state_todo_today'
}

export function getHabitStateOnDay(habit, day) {
    const startDate = parseFromString(habit.start_date)
    const today = new Date()

    if (_.some(habit.events, event => event.date === formatAsString(day))) {
        return HabitState.DONE
    }

    if (day.getTime() - startDate.getTime() <= 0) {
        return HabitState.NOT_ACTIVE
    }

    if (isToday(day)) {
        return HabitState.TODO_TODAY
    }

    if (day.getTime() > today.getTime()) {
        return HabitState.NOT_ACTIVE
    }

    return HabitState.NOT_DONE
}