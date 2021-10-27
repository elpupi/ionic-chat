import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Content, TextInput } from 'ionic-angular';


@Component({
    selector: 'mt-input-message',
    templateUrl: 'input-message.component.html'
})
export class MtInputMessage {
    @Input() disable: boolean;
    @Output() focusIn: EventEmitter<void> = new EventEmitter();
    @Output() focusOut: EventEmitter<void> = new EventEmitter();
    @Output() messageSent: EventEmitter<string> = new EventEmitter();
    @Output() onEmoticonsOpen: EventEmitter<void> = new EventEmitter();



    @ViewChild(Content) content: Content;
    @ViewChild('inputMessageArea') inputMessageArea: TextInput;



    editorMsg = '';
    showEmojiPicker = false;


    constructor() { }

    /*  get showEmojiPicker() {
         return this._showEmojiPicker;
     }

     set showEmojiPicker(show: boolean) {
         this._showEmojiPicker = show;
         this.setFocus();
     } */

    public setFocus() {
        if (!this.showEmojiPicker) { // we closed EmojiPicker
            this.inputMessageArea.setFocus();
            this.focusIn.emit();
        }
    }



    /*
     *
     * HTML defined events handlers
     */


    /*
     * INPUT MESSAGE
     */

    // Input message FOCUS events
    onFocus() {
        this.showEmojiPicker = false;
        this.focusIn.emit();
    }

    onFocusOut() {
        this.focusOut.emit();
    }

    // message sent (cliecked button)
    sendMsg() {
        this.editorMsg = this.editorMsg.trim();
        if (this.editorMsg === '') return;

        this.messageSent.emit(this.editorMsg.slice()); // copy string for security
        this.editorMsg = '';

        this.setFocus();
    }
    /*
     * EMOTICONS
     */


    // EMOTICONS clicked
    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        this.onEmoticonsOpen.emit();
        this.setFocus();
    }

}
