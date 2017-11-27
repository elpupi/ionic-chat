import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ChatClientComponent } from './chat-client.component';

import { ChatService } from '../../services/chat.service';
import { RelativeTime } from '../../pipes/relative-time';
import { EmojiPickerComponentModule } from '../../components/emoji-picker/emoji-picker.module';
import { EmojiService } from '../../services/emoji';

@NgModule({
  imports: [
    IonicPageModule.forChild(ChatClientComponent),
    EmojiPickerComponentModule,
  ],
  declarations: [
    ChatClientComponent,
    RelativeTime
  ],
  providers: [
    ChatService,
    EmojiService
  ]
})
export class ChatClientModule { }
