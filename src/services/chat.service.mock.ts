import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';

import { User } from '../shared/user';
import * as MOCKS from '../shared/USERS.mock';
import { ChatMessage } from '../shared/chat-message';
import { ChatServiceInterface } from './chat.service.interface';


@Injectable()
export class ChatServiceMock implements ChatServiceInterface {
  constructor(private events: Events) { }

  mockNewMsg(msg) {
    let user: User;
    let userTo: User;

    if (Math.random() < 0.5) {
      user = MOCKS.user;
      userTo = MOCKS.userTo;
    } else {
      userTo = MOCKS.user;
      user = MOCKS.userTo;
    }

    const mockMsg = new ChatMessage(
      Date.now().valueOf(),
      user,
      userTo,
      Date.now(),
      msg.message,
      'success'
    );

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now());
    }, Math.random() * 1800);
  }

  getMsgList(): Promise<ChatMessage[]> {
    return new Promise(resolve => setTimeout(() => resolve(MOCKS.MESSAGES), Math.random() * 1000));
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }
}
