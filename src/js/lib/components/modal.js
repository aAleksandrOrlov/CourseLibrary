import $ from '../core';

$.prototype.modal = function (created) {
  function _calcScroll() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
  }

  function _modalClose(selector, created) {
    $(selector).fadeOut(800);
    document.body.style.overflow = '';
    document.body.style.marginRight = 0;

    if (created)
      setTimeout(() => document.querySelector(selector).remove(), 800);
  }

  for (let i = 0; i < this.length; i++) {
    const id = this[i].getAttribute('data-target');

    $(this[i]).click((e) => {
      e.preventDefault();
      $(id).fadeIn(800);

      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = _calcScroll() + 'px';
    });

    $(`${id} [data-close]`).click(() => _modalClose(id, created));

    $(id).click((e) => {
      if (e.target.classList.contains('modal')) _modalClose(id);
    });
  }
};

$('[data-toggle=modal]').modal();

$.prototype.createModal = function ({ text, buttons } = {}) {
  for (let i = 0; i < this.length; i++) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', this[i].getAttribute('data-target').slice(1));

    //buttons = {count: num, settings: [[text, classNames = [], close, cb]]};
    const btns = [];
    for (let j = 0; j < buttons.count; j++) {
      const [text, classNames, close, cb] = buttons.settings[j];

      let btn = document.createElement('button');

      btn.innerHTML = text;
      btn.classList.add('btn', ...classNames);

      if (cb) btn.addEventListener('click', () => cb());
      if (close) btn.setAttribute('data-close', 'true');

      btns.push(btn);
    }

    modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
          <button class="close" data-close>
              <span>&times;</span>
          </button>
          <div class="modal-header">
              <div class="modal-title">
                  ${text.title}
              </div>
          </div>
          <div class="modal-body">
              ${text.body}
          </div>
          <div class="modal-footer">
          </div>
      </div>
    </div>
    `;

    modal.querySelector('.modal-footer').append(...btns);
    document.body.appendChild(modal);
    $(this[i]).modal(true);
    $(this[i].getAttribute('data-target')).fadeIn(800);
  }

  return this;
};