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
const messages_txt = [
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

const nb_msg = messages_txt.length;
const time_start = Date.now();
const time_offset = 10000000;//100000000;

for (let msg_i = 0; msg_i < nb_msg; ++msg_i) {
  MESSAGES.push(new ChatMessage(
    msg_i,
    msg_i % 3 === 0 ? user : userTo,
    msg_i % 3 !== 0 ? userTo : user,
    time_start - (nb_msg - 1 - msg_i) * time_offset,
    messages_txt[msg_i],
    'succsess'
  ));
}
