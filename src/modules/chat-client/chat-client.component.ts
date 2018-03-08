import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Content, Events, NavParams, TextInput } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { ChatMessage } from '../../shared/chat-message';
import { User } from '../../shared/user';
import { MtTime } from './time/time.component';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { WindowService } from '../../services/window.service';

// utils
// import Stickies from 'stickies';
import { Stickies } from 'stickies/stickies';
import { ScrollContainersMinimal } from 'stickies/scroll-containers-minimal.interface';
import { ScrollContainersSimple } from 'stickies/scroll-containers-simple';
import { ScrollOldAndNewPosition } from 'stickies/position.interface';


import moment from 'moment';

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
    // @ViewChildren(MtTime, { read: ElementRef }) times: QueryList<MtTime>;
    @ViewChildren('stickytime') times: QueryList<MtTime>;

    msgList: ChatMessage[] = [];
    editorMsg = '';
    showEmojiPicker = false;

    private stickies: Stickies;
    private scrollPosition: ScrollOldAndNewPosition;

    private stickiesList: Array<HTMLElement> = [];
    private firstStickiesAdd = true;
    private ttop: number;
    private ttop2: number;

    constructor(private chatService: ChatService, private userService: UserService,
        private windowService: WindowService,
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
        }); // chatDisabled a changé avec online status

    }


    ngOnInit() {
    }


    ngAfterViewInit() {
    }

    loadStickies() {

        this.content.ionScroll.subscribe((data) => {
            // console.log('oups');
            this.onWindowScroll(data);
        });

        this.times.changes.subscribe(queryList => {
            queryList.forEach((elementRef, index) => {

                window.setTimeout(() => {
                    console.log('native Element', elementRef.nativeElement.getBoundingClientRect().top);
                    this.stickiesList.push(elementRef.nativeElement);

                    if (index === queryList.length - 1)
                        this.addStickies();
                }, 0); // REALLLLY IMPORTANT => Before we let angular displayed in the DOM the new <time> elements and ONLY THEN we add the new stickies
            });

        });
    }

    addStickies() {
        const scrollContainer = this.content.getScrollElement();

        this.scrollPosition = {
            new: {
                scrollTop: scrollContainer.scrollTop,
                scrollLeft: scrollContainer.scrollLeft
            },
            old: {
                scrollTop: undefined,
                scrollLeft: undefined
            }
        };

        const scrollContainersSimple = new ScrollContainersSimple(scrollContainer);
        this.stickies = new Stickies(this.content.getScrollElement(), { handleEvents: false, scrollContainers: scrollContainersSimple });

        if (this.firstStickiesAdd) {
            this.stickies.add(this.stickiesList);
            this.firstStickiesAdd = false;
        }
    }

    ionViewDidLoad() {
        this.loadStickies();
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
        //   this.scrollToBottom();
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

    isNewDay(i: number) {
        if (i === 0) return true;

        const day1 = moment(this.msgList[i - 1].time);
        const day2 = moment(this.msgList[i].time);
        const diff = day2.diff(day1, 'days');

        if (diff > 0 || diff === 0 && day1.hour() > day2.hour()) {
            return true;
        }
        return false;
    }

    // @HostListener('window:scroll', ['$event'])
    onWindowScroll(data) {// $event) {
        this.scrollPosition.old = this.scrollPosition.new;
        this.scrollPosition.new = { scrollLeft: data.scrollLeft, scrollTop: data.scrollTop };

        this.stickies.scroll(this.scrollPosition);
    }
}
