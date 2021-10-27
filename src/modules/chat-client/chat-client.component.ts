import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Content, Events, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { ChatMessage } from '../../shared/chat-message';
import { User } from '../../shared/user';
import { MtTime } from './time/time.component';
import { MtInputMessage } from './input-message/input-message.component';
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
    // @ViewChildren(MtTime, { read: ElementRef }) times: QueryList<MtTime>;
    @ViewChildren('stickytime') times: QueryList<MtTime>;
    @ViewChild(MtInputMessage, { read: ElementRef }) inputMessage: ElementRef;

    msgList: ChatMessage[] = [];


    private stickies: Stickies;
    private scrollPosition: ScrollOldAndNewPosition;

    private stickiesList: Array<HTMLElement> = [];
    private firstStickiesAdd = true;


    constructor(private chatService: ChatService, private userService: UserService,
        private windowService: WindowService,
        private events: Events, navParams: NavParams) {

        const usersPromises = [
            this.userService.getUser(navParams.get('user')).then(user => this.user = user),
            this.userService.getUser(navParams.get('userTo')).then(user => this.userTo = user)
        ]; // chatDisabled a changé avec online status ??  je ne me rappelle plus pourquoi j'ai écris ca....

        Promise.all(usersPromises).then(
            () => this.chatDisabled = false,
            err => {
                console.error('Aieaaaaa ERROR HANDLING NOT YET IMPLEMENTED');
                throw new Error(err);
            }
        );

    }


    ngOnInit() {
    }


    ngAfterViewInit() {
    }

    loadStickies() {
        this.times.changes.subscribe(queryList => {
            queryList.forEach((elementRef, index) => {

                window.setTimeout(() => {
                    this.stickiesList.push(elementRef.nativeElement);

                    if (index === queryList.length - 1)
                        this.addStickies();
                }, 0); // REALLLLY IMPORTANT => Before we let angular displayed in the DOM the new <time> elements and ONLY THEN we add the new stickies
            });

        });
    }

    addStickies() {
        if (this.firstStickiesAdd) {
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
            this.stickies.add(this.stickiesList);

            this.content.ionScroll.subscribe(data => this.onWindowScroll(data));

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

    userToStatus() {
        if (this.msgList.length > 0)
            return this.msgList[this.msgList.length - 1].status;

        return '';
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


    onMessageSent(message) {
        const id = Date.now().valueOf();

        // Mock message
        const newMsg = new ChatMessage(
            id,
            this.user,
            this.userTo,
            Date.now(),
            message,
            'pending'
        );

        this.pushNewMsg(newMsg);

        this.chatService.sendMsg(newMsg)
            .then(() => {
                const index = this.getMsgIndexById(id);
                if (index !== -1) {
                    this.msgList[index].status = 'success';
                }
            });

        console.log((<HTMLElement>this.inputMessage.nativeElement).getBoundingClientRect().height);

    }

    onEmoticonsOpen() {
        this.content.resize();
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


    onInputMessageFocus() {
        this.content.resize();
        this.scrollToBottom();
    }


    onInputMessageFocusOut() {

    }

    // @HostListener('window:scroll', ['$event'])
    onWindowScroll(data) {// $event) {
        if (!data)
            return;

        this.scrollPosition.old = this.scrollPosition.new;
        this.scrollPosition.new = { scrollLeft: data.scrollLeft, scrollTop: data.scrollTop };

        this.stickies.scroll(this.scrollPosition);
    }
}
