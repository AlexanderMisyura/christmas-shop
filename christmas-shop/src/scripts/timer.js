export default class Timer {
  remaining;

  constructor(element) {
    this.create(element);
  }

  create(element) {
    this.timer = element;
    this.days = this.timer.querySelector('.days');
    this.hours = this.timer.querySelector('.hours');
    this.minutes = this.timer.querySelector('.minutes');
    this.seconds = this.timer.querySelector('.seconds');

    this.updateTime();
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
      currentDate.getUTCSeconds())
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
    this.days.textContent = this.remaining.days;
    this.hours.textContent = this.remaining.hours;
    this.minutes.textContent = this.remaining.minutes;
    this.seconds.textContent = this.remaining.seconds;
  }

  run() {
    setInterval(() => {
      this.updateTime();
      this.updateDOM();
    }, 1000);
  }
}
