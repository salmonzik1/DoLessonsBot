import { InlineKeyboard } from 'grammy';

export const keyboard = new InlineKeyboard();

const lessonsList = ['алгебра', 'геометрия', 'информатика', 'география', 'биология', 'химия', 'литература', 'нем. яз.', 'рус. яз.', 'общество', 'история', 'физика', 'обж'];

for (let i = 0; i < lessonsList.length; i++) {
	keyboard.text(lessonsList[i].charAt(0).toUpperCase() + lessonsList[i].slice(1), `setlessons-${lessonsList[i]}`);

	if ((i+1) % 3 === 0) keyboard.row();
}
