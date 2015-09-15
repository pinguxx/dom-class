var DOMClass = (function (O) {'use strict';
  var
    ATTACHED = 'onAttached',
    ATTACHED_CALLBACK = 'attachedCallback',
    CHANGED = 'onChanged',
    CHANGED_CALLBACK = 'attributeChangedCallback',
    CONSTRUCTOR = 'constructor',
    CONSTRUCTOR_CALLBACK = 'createdCallback',
    CSS = 'css',
    DETACHED = 'onDetached',
    DETACHED_CALLBAK = 'detachedCallback',
    EXTENDS = 'extends',
    NAME = 'name',
    hOP = O.hasOwnProperty,
    setIfThere = function  (where, what, target, alias) {
      if (hOP.call(where, what)) {
        target[alias] = where[what];
      }
    },
    uid = function (name) {
      return name + '-i-' + (
        hOP.call(uids, name) ? ++uids[name] : (uids[name] = 0)
      );
    },
    uids = {},
    i = 0
  ;
  return function DOMClass(description) {
    var
      el = {},
      init = hOP.call(description, CONSTRUCTOR),
      css = hOP.call(description, CSS),
      createdCallback = init && description[CONSTRUCTOR],
      constructor,
      key
    ;
    setIfThere(description, ATTACHED, el, ATTACHED_CALLBACK);
    setIfThere(description, CHANGED, el, CHANGED_CALLBACK);
    setIfThere(description, DETACHED, el, DETACHED_CALLBAK);
    for (key in description) {
      if (hOP.call(description, key)) {
        switch (key) {
          case ATTACHED:
          case CHANGED:
          case CONSTRUCTOR:
          case DETACHED:
          case EXTENDS:
          case NAME:
          case CSS:
            break;
          default:
            el[key] = description[key];
            break;
        }
      }
    }
    el[EXTENDS] = hOP.call(description, EXTENDS) ?
      description[EXTENDS].prototype :
      HTMLElement.prototype
    ;
    key = hOP.call(description, NAME) ? description[NAME] : ('x-dom-class-' + i++);
    if (css) el[CSS] = restyle(key, description[CSS]);
    el[CONSTRUCTOR_CALLBACK] = function () {
      constructor.apply(this, arguments);
      if (css) {
        this.classList.add(uid(key));
        this.css = restyle(key + '.' + this.className.split(' ').pop(), {});
      }
      if (init) createdCallback.apply(this, arguments);
    };
    constructor = new Class(el);
    return document.registerElement(
      key,
      {prototype: constructor.prototype}
    );
  };
}(Object));