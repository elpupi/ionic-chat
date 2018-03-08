import { User } from './user';
import { ChatMessage } from './chat-message';

export const user = new User(
    123,
    'Luff',
    './assets/imgs/user.jpg'
);

export const userTo = new User(
    456,
    'Roro',
    './assets/imgs/to-user.jpg'
);


export const MESSAGES: Array<ChatMessage> = [];

/* tslint:disable:quotemark */
const messagesTxt = [
    "A good programmer is someone who always looks both ways before crossing a one-way street. ",
    "Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
    "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
    "One man’s crappy software is another man’s full time job.",
    "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
    "If at first you don’t succeed, call it version 1.0",
    `The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of
  characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be
  specified by the cols and rows attributes, or even better; through CSS' height and width properties.`
];
/* tslint:enable:quotemark */

const nbMsg = 100;// messages_txt.length;
const timeStart = new Date('12/16/1988').getTime(); // Date.now();
const timeOffset = 1000 * 60 * 60 * 5; // 5 hours

for (let msg_i = 0; msg_i < nbMsg; ++msg_i) {
    MESSAGES.push(new ChatMessage(
        msg_i,
        msg_i % 3 === 0 ? user : userTo,
        msg_i % 3 !== 0 ? userTo : user,
        timeStart - (nbMsg - 1 - msg_i) * timeOffset,
        messagesTxt[msg_i % messagesTxt.length],
        'succsess'
    ));
}
