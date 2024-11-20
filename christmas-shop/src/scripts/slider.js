import { checkIsHomePage } from './utils';

const WIDE_SCREEN_STEPS = 3;
const NARROW_SCREEN_STEPS = 6;
const TRANSITION = '0.3s cubic-bezier(0.39, 0.58, 0.57, 1)';

export default class Slider {
  slider;
  left;
  right;
  currentWidth;
  maxOffset;
  currentOffset;
  stepNumber;
  stepWidth;
  constructor(parentElement) {
    this.create(parentElement);
  }

  create(parentElement) {
    if (!checkIsHomePage()) return;

    this.slider = parentElement.querySelector('.slider-row__content');
    this.left = {
      element: parentElement.querySelector('.slider-row__left'),
      isBlocked: true,
      handler: () => this.handleLeft(),
    };
    this.right = {
      element: parentElement.querySelector('.slider-row__right'),
      isBlocked: false,
      handler: () => this.handleRight(),
    };
    this.maxWidth = this.slider.scrollWidth;
    this.currentWidth = this.slider.clientWidth;
    this.maxOffset = this.maxWidth - this.currentWidth;
    this.currentOffset = 0;
    this.stepNumber = WIDE_SCREEN_STEPS;
    this.stepWidth = Math.ceil(this.maxOffset / this.stepNumber);
  }

  move(offset) {
    this.slider.style.right = `${offset}px`;
  }

  updateWidthsData() {
    this.stepNumber =
      window.innerWidth >= 768 ? WIDE_SCREEN_STEPS : NARROW_SCREEN_STEPS;
    this.maxOffset = this.maxWidth - this.slider.clientWidth;
    this.stepWidth = Math.ceil(this.maxOffset / this.stepNumber);
  }

  enableButton(side) {
    this[side].isBlocked = false;
    this[side].element.classList.remove('slider-row__btn_edge');
  }

  disableButton(side) {
    this[side].isBlocked = true;
    this[side].element.classList.add('slider-row__btn_edge');
  }

  handleLeft() {
    if (this.left.isBlocked) return;

    this.slider.style.transition = TRANSITION;

    this.enableButton('right');
    this.updateWidthsData();

    if (this.currentOffset - this.stepWidth <= 0) {
      this.currentOffset = 0;
      this.disableButton('left');
    } else {
      this.currentOffset = this.currentOffset - this.stepWidth;
    }

    this.move(this.currentOffset);
  }

  handleRight() {
    if (this.right.element.isBlocked) return;

    this.slider.style.transition = TRANSITION;

    this.enableButton('left');
    this.updateWidthsData();

    if (this.currentOffset + this.stepWidth >= this.maxOffset) {
      this.currentOffset = this.maxOffset;
      this.disableButton('right');
    } else {
      this.currentOffset = this.currentOffset + this.stepWidth;
    }

    this.move(this.currentOffset);
  }

  handleResize() {
    this.slider.style.transition = 'none';
    this.updateWidthsData();
    this.currentOffset += 0.5 * (this.currentWidth - this.slider.clientWidth);
    this.currentWidth = this.slider.clientWidth;

    if (this.currentOffset >= this.maxOffset) {
      this.currentOffset = this.maxOffset;
      this.disableButton('right');
    } else {
      this.enableButton('right');
    }

    if (this.currentOffset <= 0) {
      this.currentOffset = 0;
      this.disableButton('left');
    } else {
      this.enableButton('left');
    }

    this.move(this.currentOffset);
  }

  listen() {
    if (!checkIsHomePage()) return;

    window.addEventListener('resize', this.handleResize.bind(this));
    this.left.element.addEventListener('click', this.left.handler);
    this.right.element.addEventListener('click', this.right.handler);
  }
}
