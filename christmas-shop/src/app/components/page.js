import '../main.scss';

import BaseComponent from './base.js';
import Header from './header/header.js';
import Hero from './hero/hero.js';
import Sidebar from './sidebar/sidebar.js';
import About from './about/about.js';
import Slider from './slider/slider.js';

const TABLET_WIDTH = 768;
const DESKTOP_BREAKPOINT = `(width > ${TABLET_WIDTH}px)`;
const SLIDER_STEPS_WIDE_SCREEN = 3;
const TABLET_BREAKPOINT = `(width <= ${TABLET_WIDTH}px)`;
const SLIDER_STEPS_NARROW_SCREEN = 6;

export default class Page extends BaseComponent {
  /**
   * @param {State} [state]
   * @param {Props} [props]
   */
  constructor(props, state) {
    super(
      { elementTagName: 'div', classList: 'page' },
      [
        new Header(props, state),
        new Sidebar(props, state),
        new BaseComponent(
          { elementTagName: 'main', classList: 'main' },
          [new Hero(props, state), new About(), new Slider(props, state)],
          state
        ),
      ],
      state
    );

    this.listen();
  }

  mount() {
    document.body.append(this.getElement());

    const initialSliderSteps =
      window.innerWidth > TABLET_WIDTH
        ? SLIDER_STEPS_WIDE_SCREEN
        : SLIDER_STEPS_NARROW_SCREEN;
    this.updateState({ sliderSteps: initialSliderSteps });
  }

  listen() {
    const desktopMediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    desktopMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({
          isSidebarOpen: false,
          sliderSteps: SLIDER_STEPS_WIDE_SCREEN,
        });
      }
    });

    const tabletMediaQuery = window.matchMedia(TABLET_BREAKPOINT);
    tabletMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({ sliderSteps: SLIDER_STEPS_NARROW_SCREEN });
      }
    });
  }
}
