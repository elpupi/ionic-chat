import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Events } from 'ionic-angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChatClientModule } from '../modules/chat-client/chat-client.module';
import { ChatClientComponent } from '../modules/chat-client/chat-client.component';

import { ChatService } from '../services/chat.service';
import { ChatServiceMock } from '../services/chat.service.mock';

import { UserService } from "../services/user.service";
import { UserServiceMock } from "../services/user.service.mock";

const isChatServiceMock = true;
const isUserServiceMock = true;

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChatClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChatClientComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: ChatService, useFactory: (http, events) =>
        isChatServiceMock ? new ChatServiceMock(events) :
          new ChatService(http, events), deps: [HttpClient, Events]
    },
    {
      provide: UserService, useFactory: (http) =>
        isChatServiceMock ? new UserServiceMock() :
          new UserService(http), deps: [HttpClient]
    }
  ]
})
export class AppModule { }
