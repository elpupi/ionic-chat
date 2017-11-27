import { ChatMessage } from '../shared/chat-message';

export interface ChatServiceInterface {
  getMsgList: () => Promise<ChatMessage[]>;
  sendMsg: (msg: ChatMessage) => Promise<void>;
}
