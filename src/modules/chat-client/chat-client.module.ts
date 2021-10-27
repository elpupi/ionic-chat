import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ChatClientComponent } from './chat-client.component';
import { MtTime } from './time/time.component';
import { MtMessage } from './message/message.component';
import { MtNavBar } from './nav-bar/nav-bar.component';
import { MtInputMessage } from './input-message/input-message.component';

import { ChatService } from '../../services/chat.service';
import { RelativeTime } from '../../pipes/relative-time';
import { EmojiPickerComponentModule } from '../../components/emoji-picker/emoji-picker.module';
import { EmojiService } from '../../services/emoji';

// Utils
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        IonicPageModule.forChild(ChatClientComponent),
        EmojiPickerComponentModule,
        MomentModule
    ],
    declarations: [
        ChatClientComponent,
        RelativeTime,
        MtTime,
        MtMessage,
        MtNavBar,
        MtInputMessage
    ],
    providers: [
        ChatService,
        EmojiService
    ]
})
export class ChatClientModule { }
