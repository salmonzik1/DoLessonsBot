import { InlineKeyboard } from 'grammy';

export const keyboard = new InlineKeyboard();

keyboard
    .text('📔 Уроки', 'setlessons-call')
    .text('📝 Расписание', 'setschedule-call')
    .row()
    .text('⚙️ Настройки', 'profile-settings');
