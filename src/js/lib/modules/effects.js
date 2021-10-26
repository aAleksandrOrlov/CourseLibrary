import $ from '../core';

$.prototype.animateOverTime = function (duration, cb, finalFunc) {
  let timeStart;

  function _animateOverTime(time) {
    if (!timeStart) timeStart = time;

    let timeElapsed = time - timeStart;
    let complection = Math.min(timeElapsed / duration, 1);

    cb(complection);

    if (timeElapsed < duration) {
      requestAnimationFrame(_animateOverTime);
    } else {
      if (finalFunc) finalFunc();
    }
  }

  return _animateOverTime;
};

$.prototype.fadeIn = function (duration, display = 'block', finalFunc) {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = display;

    const _fadeIn = (complection) => {
      this[i].style.opacity = complection;
    };

    const anim = this.animateOverTime(duration, _fadeIn, finalFunc);
    requestAnimationFrame(anim);
  }

  return this;
};

$.prototype.fadeOut = function (duration, finalFunc) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = (complection) => {
      this[i].style.opacity = 1 - complection;
      if (complection === 1) this[i].style.display = 'none';
    };

    const anim = this.animateOverTime(duration, _fadeOut, finalFunc);
    requestAnimationFrame(anim);
  }

  return this;
};

$.prototype.fadeToggle = function (duration, display = 'block', finalFunc) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = (complection) => {
      this[i].style.opacity = 1 - complection;
      if (complection === 1) this[i].style.display = 'none';
    };

    const _fadeIn = (complection) => {
      this[i].style.opacity = complection;
    };

    let anim;
    if (window.getComputedStyle(this[i]).display === 'none') {
      anim = this.animateOverTime(duration, _fadeIn, finalFunc);
      this[i].style.display = display;
    } else {
      anim = this.animateOverTime(duration, _fadeOut, finalFunc);
    }

    requestAnimationFrame(anim);
  }

  return this;
};
