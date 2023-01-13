import { Keyboard } from 'grammy';

import { lessonsList } from './../../helpers/lessons-list.js';

export const lessonsKeyboard = new Keyboard();

for (let i = 0; i < lessonsList.length; i++) {
    lessonsKeyboard.text(
        lessonsList[i].charAt(0).toUpperCase() + lessonsList[i].slice(1)
    );

    if ((i + 1) % 3 === 0) lessonsKeyboard.row();
}

lessonsKeyboard.row().text('↪️ Назад').resized();
