import { Component, Input } from '@angular/core';
import { User } from '../../..//shared/user';


@Component({
    selector: 'mt-nav-bar',
    templateUrl: 'nav-bar.component.html'
})
export class MtNavBar {
    @Input() userTo: User;
    @Input() status: string;

    constructor() { }

}
