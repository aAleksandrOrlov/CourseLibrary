import $ from '../core';

$.prototype.html = function (content) {
  for (let i = 0; i < this.length; i++) {
    if (content) {
      this[i].innerHTML = content;
    } else {
      return this[i].innerHTML;
    }
  }

  return this;
};

$.prototype.eq = function (idx) {
  const elem = this[idx];

  for (let i = 0; i < this.length; i++) delete this[idx];

  this[0] = elem;
  this.length = 1;

  return this;
};

$.prototype.index = function () {
  const parent = this[0].parentNode;
  const childs = [...parent.children];

  return childs.findIndex((item) => item === this[0]);
};

$.prototype.find = function (selector) {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);

  for (let i = 0; i < copyObj.length; i++) {
    const arr = copyObj[i].querySelectorAll(selector);
    if (arr.length == 0) {
      continue;
    }

    for (let j = 0; j < arr.length; j++) {
      this[counter] = arr[j];
      counter++;
    }

    numberOfItems += arr.length;
  }

  this.length = numberOfItems;

  const objLength = Object.keys(this).length;
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems];
  }

  return this;
};

$.prototype.closest = function (selector) {
  let counter = 0;

  for (let i = 0; i < this.length; i++) {
    if (this[i].closest(selector) === null) continue;

    this[counter] = this[i].closest(selector);
    counter++;
  }

  this.length = counter;

  const objLength = Object.keys(this).length;
  for (; counter < objLength; counter++) {
    delete this[counter];
  }

  return this;
};

$.prototype.siblings = function () {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);

  for (let i = 0; i < copyObj.length; i++) {
    const arr = copyObj[i].parentNode.children;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== copyObj[i]) {
        this[counter] = arr[j];
        counter++;
      }
    }

    numberOfItems += arr.length - 1;
  }

  this.length = numberOfItems;

  const objLength = Object.keys(this).length;
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems];
  }

  return this;
};