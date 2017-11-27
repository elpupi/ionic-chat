

import { User } from './user';

export class ChatMessage {
  _messageId: number;
  _userFrom: User;
  _toUser: User;
  _time: number | string;
  _message: string;
  _status: string;

  constructor(
    messageId: number,
    userFrom: User,
    userTo: User,
    time: number | string,
    message: string,
    status: string) {

    this._messageId = messageId;
    this._userFrom = userFrom;
    this._toUser = userTo;
    this._time = time;
    this._message = message;
    this._status = status;
  }

  get messageId() {
    return this._messageId;
  }

  get userFrom() {
    return this._userFrom;
  }

  get userTo() {
    return this._toUser;
  }

  get time() {
    return this._time;
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }

  set status(stat: string) {
    this._status = stat;
  }
}
