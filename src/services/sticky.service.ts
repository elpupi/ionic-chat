//import { Injectable } from '@angular/core';

/*
 * 3. Utility functions
 */
function extend(targetObj, sourceObject) {
  for (var key in sourceObject) {
    if (sourceObject.hasOwnProperty(key)) {
      targetObj[key] = sourceObject[key];
    }
  }
}


let assign = extend;


interface Style {
  [key: string]: string;
}

interface SavedNode {
  node: HTMLElement;
  offsetHeight: number;
  styles: Style;
}

interface CloneNode {
  node: HTMLElement;
  docOffsetTop: number;
}

interface Offset {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}

interface Limit {
  start: number;
  end: number;
}


//@Injectable()
export class Sticky {

  /*
   * 2. “Global” vars used across the polyfill
   */

  // Check if Shadow Root constructor exists to make further checks simpler
  //static const shadowRootExists = typeof ShadowRoot !== 'undefined';

  // Last saved scroll position
  scrollPosition = {
    top: null,
    left: null
  };

  node: HTMLElement;
  parentNode: HTMLElement;
  stickyMode: string;
  active: boolean;
  removed: boolean;
  seppuku: boolean;

  parent: SavedNode;
  offsetToWindow: Offset;
  offsetToParent: Offset;
  styles: Style;
  limits: Limit;

  clone: CloneNode;

  // Array of created Sticky instances
  static stickies: Array<Sticky> = [];

  constructor(node: HTMLElement) {
    /*
     * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
     *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
     *    of the polyfill, but the API will remain functional to avoid breaking things.
     */

    // The polyfill cant’t function properly without `getComputedStyle`.
    if (!window.getComputedStyle) this.seppuku = true;
    // Dont’t get in a way if the browser supports `position: sticky` natively.
    else {
      const testNode = document.createElement('div');

      if (
        ['', '-webkit-', '-moz-', '-ms-'].some(prefix => {
          try {
            testNode.style.position = prefix + 'sticky';
          }
          catch (e) { }

          return testNode.style.position != '';
        })
      ) this.seppuku = true;
    }



    if (!(node instanceof HTMLElement))
      throw new Error('First argument must be HTMLElement');
    if (Sticky.stickies.some(sticky => sticky.node === node))
      throw new Error('Stickyfill is already applied to this node');

    this.node = node;
    this.stickyMode = null;
    this.active = false;
    Sticky.stickies.push(this);

    this.refresh();

    if (!this.seppuku) this.init();
  }


  /*
   * 3. Utility functions
   */

  private parseNumeric(val) {
    return parseFloat(val) || 0;
  }

  private getDocOffsetTop(node) {
    let docOffsetTop = 0;

    while (node) {
      docOffsetTop += node.offsetTop;
      node = node.offsetParent;
    }

    return docOffsetTop;
  }




  private refresh() {
    if (this.seppuku || this.removed) return;
    if (this.active) this.deactivate();

    const node = this.node;

    /*
     * 1. Save node computed props
     */
    const nodeComputedStyle = getComputedStyle(node);
    const nodeComputedProps = {
      top: nodeComputedStyle.top,
      display: nodeComputedStyle.display,
      marginTop: nodeComputedStyle.marginTop,
      marginBottom: nodeComputedStyle.marginBottom,
      marginLeft: nodeComputedStyle.marginLeft,
      marginRight: nodeComputedStyle.marginRight,
      cssFloat: nodeComputedStyle.cssFloat
    };

    /*
     * 2. Check if the node can be activated
     */
    if (
      isNaN(parseFloat(nodeComputedProps.top)) ||
      nodeComputedProps.display == 'table-cell' ||
      nodeComputedProps.display == 'none'
    ) return;

    this.active = true;

    /*
     * 3. Get necessary node parameters
     */
    const referenceParentNode = node.parentNode;
    const parentNode = (<ShadowRoot><any>referenceParentNode).host ? (<any>referenceParentNode).host : referenceParentNode;
    const nodeWinOffset = node.getBoundingClientRect();
    const parentWinOffset = parentNode.getBoundingClientRect();
    const parentComputedStyle = getComputedStyle(parentNode);

    this.parent = {
      node: parentNode,
      styles: {
        position: parentNode.style.position
      },
      offsetHeight: parentNode.offsetHeight
    };

    this.offsetToWindow = {
      left: nodeWinOffset.left,
      right: document.documentElement.clientWidth - nodeWinOffset.right
    };

    this.offsetToParent = {
      top: nodeWinOffset.top - parentWinOffset.top - this.parseNumeric(parentComputedStyle.borderTopWidth),
      left: nodeWinOffset.left - parentWinOffset.left - this.parseNumeric(parentComputedStyle.borderLeftWidth),
      right: -nodeWinOffset.right + parentWinOffset.right - this.parseNumeric(parentComputedStyle.borderRightWidth)
    };

    this.styles = {
      position: node.style.position,
      top: node.style.top,
      bottom: node.style.bottom,
      left: node.style.left,
      right: node.style.right,
      width: node.style.width,
      marginTop: node.style.marginTop,
      marginLeft: node.style.marginLeft,
      marginRight: node.style.marginRight
    };



    const nodeTopValue = this.parseNumeric(nodeComputedProps.top);
    this.limits = {
      start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
      end: parentWinOffset.top + window.pageYOffset + parentNode.offsetHeight -
      this.parseNumeric(parentComputedStyle.borderBottomWidth) - node.offsetHeight -
      nodeTopValue - this.parseNumeric(nodeComputedProps.marginBottom)
    };

    /*
     * 4. Ensure that the node will be positioned relatively to the parent node
     */
    const parentPosition = parentComputedStyle.position;

    if (
      parentPosition != 'absolute' &&
      parentPosition != 'relative'
    ) {
      parentNode.style.position = 'relative';
    }

    /*
     * 5. Recalc node position.
     *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
     */
    this.recalcPosition();

    /*
     * 6. Create a clone
     */
    const clone = this.clone = <CloneNode>{};
    clone.node = document.createElement('div');

    // Apply styles to the clone
    assign(clone.node.style, {
      width: nodeWinOffset.right - nodeWinOffset.left + 'px',
      height: nodeWinOffset.bottom - nodeWinOffset.top + 'px',
      marginTop: nodeComputedProps.marginTop,
      marginBottom: nodeComputedProps.marginBottom,
      marginLeft: nodeComputedProps.marginLeft,
      marginRight: nodeComputedProps.marginRight,
      cssFloat: nodeComputedProps.cssFloat,
      padding: 0,
      border: 0,
      borderSpacing: 0,
      fontSize: '1em',
      position: 'static'
    });


    referenceParentNode.insertBefore(clone.node, node);
    clone.docOffsetTop = this.getDocOffsetTop(clone.node);
  }

  private recalcPosition() {
    if (!this.active || this.removed) return;

    const stickyMode = this.scrollPosition.top <= this.limits.start ? 'start' : this.scrollPosition.top >= this.limits.end ? 'end' : 'middle';

    if (this.stickyMode == stickyMode) return;

    switch (stickyMode) {
      case 'start':
        assign(this.node.style, {
          position: 'absolute',
          left: this.offsetToParent.left + 'px',
          right: this.offsetToParent.right + 'px',
          top: this.offsetToParent.top + 'px',
          bottom: 'auto',
          width: 'auto',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0
        });
        break;

      case 'middle':
        assign(this.node.style, {
          position: 'fixed',
          left: this.offsetToWindow.left + 'px',
          right: this.offsetToWindow.right + 'px',
          top: this.styles.top,
          bottom: 'auto',
          width: 'auto',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0
        });
        break;

      case 'end':
        assign(this.node.style, {
          position: 'absolute',
          left: this.offsetToParent.left + 'px',
          right: this.offsetToParent.right + 'px',
          top: 'auto',
          bottom: 0,
          width: 'auto',
          marginLeft: 0,
          marginRight: 0
        });
        break;
    }

    this.stickyMode = stickyMode;
  }

  private fastCheck() {
    if (!this.active || this.removed) return;

    if (
      Math.abs(this.getDocOffsetTop(this.clone.node) - this.clone.docOffsetTop) > 1 ||
      Math.abs(this.parent.node.offsetHeight - this.parent.offsetHeight) > 1
    ) this.refresh();
  }

  private deactivate() {
    if (!this.active || this.removed) return;

    this.clone.node.parentNode.removeChild(this.clone.node);
    this.clone = null;

    assign(this.node.style, this.styles);
    this.styles = null;

    // Check whether element’s parent node is used by other stickies.
    // If not, restore parent node’s styles.
    if (!Sticky.stickies.some(sticky => sticky !== this && sticky.parent && sticky.parent.node === this.parent.node)) {
      assign(this.parent.node.style, this.parent.styles);
    }
    this.parent = null;

    this.stickyMode = null;
    this.active = false;

    this.offsetToWindow = null;
    this.offsetToParent = null;
    this.limits = null;
  }

  private remove_stickynode() {
    this.deactivate();

    Sticky.stickies.some((sticky, index) => {
      if (sticky.node === this.node) {
        Sticky.stickies.splice(index, 1);
        return true;
      }
    });

    this.removed = true;
  }


  static addOne(node) {
    // Check whether it’s a node
    if (!(node instanceof HTMLElement)) {
      // Maybe it’s a node list of some sort?
      // Take first node from the list then
      if (node.length && node[0]) node = node[0];
      else return;
    }

    // Check if Stickyfill is already applied to the node
    // and return existing sticky
    for (var i = 0; i < Sticky.stickies.length; i++) {
      if (Sticky.stickies[i].node === node) return Sticky.stickies[i];
    }

    // Create and return new sticky
    return new Sticky(node);
  }

  static add(nodeList) {
    // If it’s a node make an array of one node
    if (nodeList instanceof HTMLElement) nodeList = [nodeList];
    // Check if the argument is an iterable of some sort
    if (!nodeList.length) return;

    // Add every element as a sticky and return an array of created Sticky instances
    const addedStickies: Array<Sticky> = [];

    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i];

      // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
      // correlation with input list
      if (!(node instanceof HTMLElement)) {
        addedStickies.push(null);
        continue;
      }

      // If Stickyfill is already applied to the node
      // add existing sticky
      if (Sticky.stickies.some(sticky => {
        if (sticky.node === node) {
          addedStickies.push(sticky);
          return true;
        }
      })) continue;

      // Create and add new sticky
      addedStickies.push(new Sticky(node));
    }

    return addedStickies;
  }

  static refreshAll() {
    Sticky.stickies.forEach(sticky => sticky.refresh());
  }

  static removeOne(node) {
    // Check whether it’s a node
    if (!(node instanceof HTMLElement)) {
      // Maybe it’s a node list of some sort?
      // Take first node from the list then
      if (node.length && node[0]) node = node[0];
      else return;
    }

    // Remove the stickies bound to the nodes in the list
    Sticky.stickies.some(sticky => {
      if (sticky.node === node) {
        sticky.remove_stickynode();
        return true;
      }
    });
  }

  static remove(nodeList) {
    // If it’s a node make an array of one node
    if (nodeList instanceof HTMLElement) nodeList = [nodeList];
    // Check if the argument is an iterable of some sort
    if (!nodeList.length) return;

    // Remove the stickies bound to the nodes in the list
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i];

      Sticky.stickies.some(sticky => {
        if (sticky.node === node) {
          sticky.remove_stickynode();
          return true;
        }
      });
    }
  }

  static removeAll() {
    while (Sticky.stickies.length) Sticky.stickies[0].remove_stickynode();
  }



  /*
   * 6. Setup events (unless the polyfill was disabled)
   */
  private init() {
    // Watch for scroll position changes and trigger recalc/refresh if needed
    let checkScroll = (() => {
      let ticking = false;
      let last_known_scroll_position = 0;
      let last_known_xoffset = 0, last_known_yoffset = 0;

      let onScroll = () => {
        //last_known_scroll_position = window.scrollY = window.pageYOffset but newer;
        last_known_xoffset = window.pageXOffset;
        last_known_yoffset = window.pageYOffset;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            if (last_known_xoffset != this.scrollPosition.left) {
              this.scrollPosition.top = last_known_yoffset;
              this.scrollPosition.left = last_known_xoffset;

              this.refreshAll();
            }
            else if (last_known_yoffset != this.scrollPosition.top) {
              this.scrollPosition.top = last_known_yoffset;
              this.scrollPosition.left = last_known_xoffset;

              // recalc position for all stickies
              Sticky.stickies.forEach(sticky => sticky.recalcPosition());
            }

            //doSomething(last_known_scroll_position);

            ticking = false;
          });

          ticking = true;
        }
      };


      return onScroll;
    })();

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Watch for window resizes and device orientation cahnges and trigger refresh
    window.addEventListener('resize', Sticky.refreshAll);
    window.addEventListener('orientationchange', Sticky.refreshAll);

    //Fast dirty check for layout changes every 500ms
    let fastCheckTimer: any;

    let startFastCheckTimer = () => {
      fastCheckTimer = setInterval(() => {
        Sticky.stickies.forEach(sticky => sticky.fastCheck());
      }, 500);
    }

    let stopFastCheckTimer = () => {
      clearInterval(fastCheckTimer);
    }

    let docHiddenKey: string;
    let visibilityChangeEventName: string;

    if ('hidden' in document) {
      docHiddenKey = 'hidden';
      visibilityChangeEventName = 'visibilitychange';
    }
    else if ('webkitHidden' in document) {
      docHiddenKey = 'webkitHidden';
      visibilityChangeEventName = 'webkitvisibilitychange';
    }

    if (visibilityChangeEventName) {
      if (!document[docHiddenKey]) startFastCheckTimer();

      document.addEventListener(visibilityChangeEventName, () => {
        if (document[docHiddenKey]) {
          stopFastCheckTimer();
        }
        else {
          startFastCheckTimer();
        }
      });
    }
    else startFastCheckTimer();
  }

}
