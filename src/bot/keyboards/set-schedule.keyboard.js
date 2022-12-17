import { InlineKeyboard } from 'grammy';

export const keyboard = new InlineKeyboard();

const daysList = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];

for (let i = 0; i < daysList.length; i++) {
	keyboard.text(daysList[i].charAt(0).toUpperCase() + daysList[i].slice(1), `setschedule-${daysList[i]}`);

	if ((i+1) % 3 === 0) keyboard.row();
}