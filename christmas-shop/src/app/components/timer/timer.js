import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './timer.module.scss';

/** @type {['days', 'hours', 'minutes', 'seconds']} */
const TIME_UNITS = ['days', 'hours', 'minutes', 'seconds'];

export default class Timer extends BaseComponent {
  /** @type {BaseComponent} */
  days;

  /** @type {BaseComponent} */
  hours;

  /** @type {BaseComponent} */
  minutes;

  /** @type {BaseComponent} */
  seconds;

  /** @type {{days: number, hours: number, minutes: number, seconds: number}} */
  remaining;

  constructor() {
    super({ elementTagName: 'div', classList: styles.timer });

    const timerUnits = TIME_UNITS.map((unit) => {
      this[unit] = tag.div({
        classList: 'heading-2',
        text: '--',
      });

      const timerSection = tag.div({ classList: styles.timerSection }, [
        this[unit],
        tag.div({ classList: 'heading-4', text: unit }),
      ]);

      return timerSection;
    });

    this.appendChildElements(timerUnits);

    this.run();
  }

  updateTime() {
    const currentDate = new Date();
    const currentUTCDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        currentDate.getUTCHours(),
        currentDate.getUTCMinutes(),
        currentDate.getUTCSeconds()
      )
    );

    const newYearUTC = new Date(Date.UTC(currentUTCDate.getUTCFullYear() + 1));
    const deltaUTC = newYearUTC - currentUTCDate;

    this.remaining = {
      days: Math.floor(deltaUTC / (1000 * 60 * 60 * 24)),
      hours: Math.floor((deltaUTC / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((deltaUTC / (1000 * 60)) % 60),
      seconds: Math.floor((deltaUTC / 1000) % 60),
    };
  }

  updateDOM() {
    this.days.setText(this.remaining.days.toString());
    this.hours.setText(this.remaining.hours.toString());
    this.minutes.setText(this.remaining.minutes.toString());
    this.seconds.setText(this.remaining.seconds.toString());
  }

  run() {
    setInterval(() => {
      this.updateTime();
      this.updateDOM();
    }, 1000);
  }
}
