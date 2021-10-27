import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../../shared/chat-message';
import { User } from '../../../shared/user';

@Component({
    selector: 'mt-message',
    templateUrl: './message.component.html'
})
export class MtMessage implements OnInit {
    @Input() message: ChatMessage;
    @Input() user: User;

    constructor() { }

    ngOnInit() {
    }

}
