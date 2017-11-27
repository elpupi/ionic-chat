import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ChatClientComponent } from '../../modules/chat-client/chat-client.component';
import * as MOCKS from '../../shared/USERS.mock';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set some user information on chatParams
  chatParams = {
    user: MOCKS.user.id,
    userTo: MOCKS.userTo.id
  };
  tabChat = ChatClientComponent;

  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
