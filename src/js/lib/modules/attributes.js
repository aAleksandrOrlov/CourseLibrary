import $ from '../core';

$.prototype.addAttr = function (name, value = '') {
  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(name, value);
  }

  return this;
};

$.prototype.removeAttr = function (name) {
  for (let i = 0; i < this.length; i++) {
    this[i].removeAttribute(name);
  }

  return this;
};

$.prototype.getAttr = function (name) {
  for (let i = 0; i < this.length; i++) {
    return this[i].getAttribute(name);
  }

  return this;
};
