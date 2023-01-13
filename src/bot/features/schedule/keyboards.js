import { Keyboard } from 'grammy';

import { daysList } from '#bot/helpers/days-list.js';

export const setScheduleKeyboard = new Keyboard();

for (let i = 1; i < daysList.length - 1; i++) {
    setScheduleKeyboard.text(
        daysList[i].charAt(0).toUpperCase() + daysList[i].slice(1)
    );

    if ((i + 1) % 3 === 0) setScheduleKeyboard.row();
}

setScheduleKeyboard.row().text('↪️ Назад').resized();
