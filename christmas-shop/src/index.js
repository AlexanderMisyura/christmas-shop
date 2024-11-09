import './main.scss';

import preloader from './scripts/preloader';
import Gifts from './scripts/gifts';
import toggleSidebar from './scripts/processSidebar';
import scrollBtn from './scripts/scrollBtn';
import Slider from './scripts/slider';
import Timer from './scripts/timer';

preloader();
toggleSidebar();
scrollBtn();

const gifts = new Gifts();
gifts.listen();

const slider = new Slider(document.querySelector('.slider-row'));
slider.listen();

const timer = new Timer(document.querySelector('.timer'));
timer.run();
