//wrap the window object inside a service so then you can mock it for testing purposes.

import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
  public window = window;
}
