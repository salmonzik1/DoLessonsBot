import { Context as DContext } from 'grammy';

export class Context extends DContext {
    replyI18n(text, other) {
        return this.reply(this.t(text), other);
    }
}
