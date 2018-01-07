/*
 * Copyright (c) 2018 PROPHESSOR
*/

'use strict';

/* eslint-disable no-use-before-define */

const JsMB = require('../graphics/jsmb-pseudo');
const EventListener = require('events');

const scw = JsMB.screenWidth();
const sch = JsMB.screenHeight();

class UI {
  constructor () {
    '';
  }
}

class Window extends EventListener {
  constructor (title, linecolor = 0xF, bgcolor = 0, width = scw, height = sch, offsetx = 0, offsety = 0) {
    super();
    this.title = title;
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.width = width;
    this.height = height;
    this.linecolor = linecolor;
    this.bgcolor = bgcolor;

    this.buttonoffset = 5;

    this.buttons = [];

    this.render();
  }

  render() {
    const offset = Math.floor(this.title.length / 2);

    JsMB.fillScreen(this.bgcolor)
      .setColor(this.linecolor)
      .drawRect(this.offsetx, this.offsety, this.width, this.height)
      .setColor(this.bgcolor)
      .setBackColor(this.linecolor)
      .drawString(this.title, (this.width / 2) - offset, 0);
  }

  addButton(button) {
    if (!(button instanceof Button)) throw new TypeError();

    this.buttons.push(button);
    const tmp = [
      this.offsetx + this.buttonoffset,
      this.offsety + this.height - Button.height - 3
    ];

    console.log(tmp);

    button.render(
      tmp[0], tmp[1]
    );

    this.buttonoffset += button.title.length + 5/* 3 */; // Button.width + 1;
  }
}

class Button extends EventListener {
  constructor (title, color = 0xF, textcolor = 0, linecolor = 0xF, hovercolor = 0xA) {
    super();

    let props = null;

    if (typeof color === 'object') {
      props = color;
      color = props.color || 0xF; // TODO: Упростить
      textcolor = props.textcolor || 0;
      linecolor = props.linecolor || 0;
      hovercolor = props.hovercolor || 0xA;
    }

    this.title = title;
    this.color = color;
    this.textcolor = textcolor;
    this.linecolor = linecolor;
    this.hovercolor = hovercolor;
    this.tmpcolor = [];
    this.tempoffset = [0, 0];
  }

  render(offsetx, offsety) {
    if (typeof offsetx !== 'number') [offsetx, offsety] = this.offset;
    this.offset = [offsetx, offsety];

    const width = this.title.length + 3;
    const textoffset = 2;// Math.floor(width / 2) - (width % 2);

    JsMB // TODO: Responsible buttons
      .setColor(this.color)
      .setBackColor(this.color)
      .fillRect(offsetx, offsety, width, Button.height)
      // .setColor(this.linecolor)
      // .drawRect(offsetx, offsety, Button.width, Button.height)
      .setColor(this.textcolor)
      .setBackColor(this.color)
      .drawString(this.title.slice(0, width - 2), offsetx + textoffset, offsety);
  }

  hover(mode) {
    if (mode) {
      this.tmpcolor.push(this.color);
      this.color = this.hovercolor;
    } else {
      this.color = this.tmpcolor.pop();
    }
    this.render();
    this.emit('hover', mode);
  }
}

Button.width = 10;
Button.height = 0;

UI.Window = Window;
UI.Button = Button;

module.exports = UI;