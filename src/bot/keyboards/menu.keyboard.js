import { Keyboard } from 'grammy';

export const keyboard = new Keyboard();

keyboard
    .text('📁 Д/З')
    .text('📚 Всё расписание')
    .row()
    .text('📔 Уроки')
    .text('📝 Расписание')
    .row()
    .text('👤 Профиль')
    .resized();
