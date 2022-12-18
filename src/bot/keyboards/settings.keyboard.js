import { InlineKeyboard } from 'grammy';

export const keyboard = new InlineKeyboard();

keyboard
	.text('Дни недели').text('Кол-во иностранных').row()
	.text('Названия иностранных').row()
	.text('↪️ Назад', 'profile-back');