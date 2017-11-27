import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatServerComponent } from './chat-server.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatServerComponent],
  exports: [ChatServerComponent]
})
export class ChatServerModule { }
