import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { User } from '../shared/user';
import { ChatMessage } from '../shared/chat-message';
import { ChatServiceInterface } from './chat.service.interface';
import * as MOCKS from '../shared/USERS.mock';

@Injectable()
export class ChatService implements ChatServiceInterface {
  constructor(public http: HttpClient,
    public events: Events) {
  }


  getMsgList(): Promise<ChatMessage[]> {
    return Promise.resolve(MOCKS.MESSAGES);
  }

  sendMsg(msg: ChatMessage): Promise<void> {
    return Promise.resolve();
  }

}
