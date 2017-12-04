import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Content, Events, NavParams, TextInput } from 'ionic-angular';

import { ChatMessage } from '../../shared/chat-message';
import { User } from '../../shared/user';
import { ChatService } from "../../services/chat.service";
import { UserService } from "../../services/user.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-client',
  templateUrl: './chat-client.component.html'
})
export class ChatClientComponent implements OnInit {
  @Input() user: User;
  @Input() userTo: User;
  chatDisabled = true;

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  msgList: ChatMessage[] = [];
  editorMsg = '';
  showEmojiPicker = false;

  constructor(private chatService: ChatService, private userService: UserService,
    private events: Events, navParams: NavParams) {

    let disable = true;
    this.userService.getUser(navParams.get('user')).then(user => {
      this.user = user;
      if (disable) {
        disable = false;
      } else {
        this.chatDisabled = false;
      }
    });
    this.userService.getUser(navParams.get('userTo')).then(user => {
      this.userTo = user;
      if (disable) {
        disable = false;
      } else {
        this.chatDisabled = false;
      }
    });//chatDisabled a changé avec online status
  }


  public ngOnInit(): void {
    console.log("zz");
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    // get message list
    this.getMsg()
      .then(() => {
        this.scrollToBottom();
      });

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    });
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    // Get mock message list
    return this.chatService.getMsgList()
      .then(res => {
        this.msgList = res;
      })
      .catch(err => {
        console.log(err);
      });
  }


  sendMsg() {
    // tslint:disable-next-line:curly
    if (!this.editorMsg.trim()) return;

    const id = Date.now().valueOf();
    // Mock message
    const newMsg = new ChatMessage(
      id,
      this.user,
      this.userTo,
      Date.now(),
      this.editorMsg,
      'pending'
    );

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }

    this.chatService.sendMsg(newMsg)
      .then(() => {
        const index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      });
  }

  pushNewMsg(msg: ChatMessage) {
    this.msgList.push(msg);
    this.scrollToBottom();
  }

  getMsgIndexById(id: number) {
    return this.msgList.findIndex(e => e.messageId === id);
  }

  scrollToBottom() {
    setTimeout(() => { this.content.scrollToBottom(); }, 0);
    // setTimeout 0 => to let angular and ionic to execute the ngFor.
    // Otherwise the page is scrolled down before the lines are added to the DOM
  }

  isFirstMessage(i: number) {
    if (i === 0 || this.msgList[i - 1].userFrom !== this.msgList[i].userFrom) return true;
    return false;
  }
}
