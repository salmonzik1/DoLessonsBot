export const daysList = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
];

export function dayName2id(dayName) {
    const days = {
        воскресенье: 0,
        понедельник: 1,
        вторник: 2,
        среда: 3,
        четверг: 4,
        пятница: 5,
        суббота: 6,
    };

    return days[dayName];
}

export function id2dayName(id) {
    return daysList[id];
}
