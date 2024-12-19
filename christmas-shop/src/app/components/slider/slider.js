import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import svgChunkTemplate from '../svgChunkTemplate.js';

import * as styles from './slider.module.scss';
import * as animatedBg from '../snowfall/snowfall.module.scss';

import arrowLeft from './icons/arrow-left.svg';
import arrowRight from './icons/arrow-right.svg';

const START_POSITION = 0;
const TRANSITION = '0.3s cubic-bezier(0.39, 0.58, 0.57, 1)';
const LEFT = 'left';
const RIGHT = 'right';

const TABLET_WIDTH = 768;
const DESKTOP_BREAKPOINT = `(width > ${TABLET_WIDTH}px)`;
const STEPS_WIDE_SCREEN = 3;
const TABLET_BREAKPOINT = `(width <= ${TABLET_WIDTH}px)`;
const STEPS_NARROW_SCREEN = 6;

/**
 * @type {{text: string, fileName: string, alt: string}[]}
 */
const sliderContent = [
  {
    text: 'live',
    fileName: 'snowman.png',
    alt: 'Snowman',
  },
  {
    text: 'create',
    fileName: 'christmas-trees.png',
    alt: 'Christmas trees',
  },
  {
    text: 'love',
    fileName: 'christmas-tree-ball.png',
    alt: 'Christmas tree ball',
  },
  {
    text: 'dream',
    fileName: 'fairytale-house.png',
    alt: 'Fairytale house',
  },
];

/**
 * @typedef {Object} SliderControl
 * @property {BaseComponent} button
 * @property {Boolean} isBlocked
 * @property {EventListenerOrEventListenerObject} handler
 */

/**
 * Limits function calls.
 * @param {Function} func - The function to limit its calls.
 * @param {number} timeout - Delay during which the previous function call will be canceled.
 * @returns {Function} - A debounced wrapper with function.
 */
function debounce(func, timeout) {
  let timeoutId;
  return function wrapperDebounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), timeout);
  };
}

export default class Slider extends BaseComponent {
  // #region properties
  /** @type {BaseComponent} */
  slider;

  /** @type {SliderControl} */
  left;

  /** @type {SliderControl} */
  right;

  /** @type {number} */
  currentWidth;

  /** @type {number} */
  maxOffset;

  /** @type {number} */
  currentOffset;

  /** @type {number} */
  stepNumber;

  /** @type {number} */
  stepWidth;
  // #endregion

  /**
   * @param {State} state
   */
  constructor(state) {
    super({ elementTagName: 'section' }, [], state);

    this.createSliderElement();
    this.fillSlider();

    this.maxWidth = this.slider.element.scrollWidth;
    this.currentWidth = this.slider.element.clientWidth;
    this.maxOffset = this.maxWidth - this.currentWidth;
    this.currentOffset = START_POSITION;
    this.stepNumber = this.state.stateObj.sliderSteps;
    this.stepWidth = Math.ceil(this.maxOffset / this.stepNumber);

    if (this.state) {
      this.subscribe(this.state, this.updateStepNumber.bind(this));
    }

    window.addEventListener(
      'resize',
      /** @type {EventListenerOrEventListenerObject} */ (
        debounce(this.handleResize.bind(this), 50)
      )
    );

    const initialSteps =
      window.innerWidth > TABLET_WIDTH
        ? STEPS_WIDE_SCREEN
        : STEPS_NARROW_SCREEN;
    this.updateState({ sliderSteps: initialSteps });

    this.listen();
  }

  /**
   * Generates HTML elements for slider component.
   * @returns {void}
   */
  createSliderElement() {
    const wrapper = tag.div({
      classList: [styles.sliderWrapper, 'wrapper', animatedBg.snowfall],
    });

    this.appendSingleChild(wrapper);

    this.slider = tag.div({ classList: styles.sliderRowContent });

    const buttonsBlock = this.createControlBlock();

    const container = tag.div(
      {
        classList: [
          styles.sliderContainer,
          'main-container',
          animatedBg.snowfallWrapper,
        ],
      },
      [
        tag.div({ classList: styles.sliderText }, [
          tag.div({ classList: 'caption', text: 'Become Happier!' }),
          tag.h2({ classList: 'heading-2', text: 'in the new 2025' }),
        ]),
        tag.div({ classList: styles.sliderRow }, [this.slider, buttonsBlock]),
      ]
    );

    wrapper.appendSingleChild(container);
  }

  createControlBlock() {
    const leftBtn = tag.button({
      classList: ['btn_icon', styles.sliderRowBtn, styles.sliderRowBtnEdge],
    });
    leftBtn.element.innerHTML = svgChunkTemplate(arrowLeft, 'icon-medium');

    const rightBtn = tag.button({
      classList: ['btn_icon', styles.sliderRowBtn],
    });
    rightBtn.element.innerHTML = svgChunkTemplate(arrowRight, 'icon-medium');

    /** @type {SliderControl} */
    this.left = {
      button: leftBtn,
      isBlocked: true,
      handler: () => this.handleLeft(),
    };

    /** @type {SliderControl} */
    this.right = {
      button: rightBtn,
      isBlocked: false,
      handler: () => this.handleRight(),
    };

    this.left.button.addListener('click', this.left.handler);
    this.right.button.addListener('click', this.right.handler);

    const buttonsBlock = tag.div({ classList: styles.sliderRowButtonsBlock });
    buttonsBlock.appendChildElements([this.left.button, this.right.button]);

    return buttonsBlock;
  }

  /**
   * Fills slider element with images and text content.
   * @returns {void}
   */
  fillSlider() {
    sliderContent.forEach(async (item) => {
      const imageSrc = await import(`./img/${item.fileName}`);

      this.slider.appendChildElements([
        tag.div(
          { classList: styles.sliderRowText },
          tag.span({
            classList: 'slider-text',
            text: item.text,
          })
        ),
        tag.img({
          classList: styles.sliderRowImage,
          alt: item.alt,
          src: imageSrc.default,
        }),
      ]);
    });
  }

  /**
   * Makes a specific slider button active.
   * @param {'left' | 'right'} side
   * @returns {void}
   */
  enableButton(side) {
    this[side].isBlocked = false;
    this[side].button.removeClasses(styles.sliderRowBtnEdge);
  }

  /**
   * Makes a specific slider button inactive.
   * @param {'left' | 'right'} side
   * @returns {void}
   */
  disableButton(side) {
    this[side].isBlocked = true;
    this[side].button.addClasses(styles.sliderRowBtnEdge);
  }

  /**
   * Handles click on the left slider control.
   * @returns {void}
   */
  handleLeft() {
    if (this.left.isBlocked) return;

    this.slider.element.style.transition = TRANSITION;

    this.enableButton(RIGHT);
    this.recalculate();

    if (this.currentOffset - this.stepWidth <= START_POSITION) {
      this.currentOffset = START_POSITION;
      this.disableButton(LEFT);
    } else {
      this.currentOffset -= this.stepWidth;
    }

    this.move(this.currentOffset);
  }

  /**
   * Handles click on the right slider control.
   * @returns {void}
   */
  handleRight() {
    if (this.right.isBlocked) return;

    this.slider.element.style.transition = TRANSITION;

    this.enableButton(LEFT);
    this.recalculate();

    if (this.currentOffset + this.stepWidth >= this.maxOffset) {
      this.currentOffset = this.maxOffset;
      this.disableButton(RIGHT);
    } else {
      this.currentOffset += this.stepWidth;
    }

    this.move(this.currentOffset);
  }

  /**
   * Updates slider's max offset and step width and offset.
   * @returns {void}
   */
  recalculate() {
    this.maxWidth = this.slider.element.scrollWidth;

    this.maxOffset = this.maxWidth - this.slider.element.clientWidth;
    this.stepWidth = Math.ceil(this.maxOffset / this.stepNumber);
  }

  /**
   * Moves the slider by the specified offset.
   * @param {Number} offset
   * @returns {void}
   */
  move(offset) {
    this.slider.element.style.transform = `translateX(-${offset}px)`;
  }

  /**
   * Sets slider's steps number.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateStepNumber(stateObj) {
    this.stepNumber = stateObj.sliderSteps;
  }

  /**
   * Holds slider's position while resizing the viewport.
   * @returns {void}
   */
  handleResize() {
    this.recalculate();

    this.slider.element.style.transition = 'none';
    this.currentOffset +=
      0.5 * (this.currentWidth - this.slider.element.clientWidth);
    this.currentWidth = this.slider.element.clientWidth;

    if (this.currentOffset >= this.maxOffset) {
      this.currentOffset = this.maxOffset;
      this.disableButton(RIGHT);
    } else {
      this.enableButton(RIGHT);
    }

    if (this.currentOffset <= START_POSITION) {
      this.currentOffset = START_POSITION;
      this.disableButton(LEFT);
    } else {
      this.enableButton(LEFT);
    }

    this.move(this.currentOffset);
  }

  /**
   * Adds listeners to change slider steps.
   * @returns {void}
   */
  listen() {
    const desktopMediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    desktopMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({
          sliderSteps: STEPS_WIDE_SCREEN,
        });
      }
    });

    const tabletMediaQuery = window.matchMedia(TABLET_BREAKPOINT);
    tabletMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({ sliderSteps: STEPS_NARROW_SCREEN });
      }
    });
  }
}
