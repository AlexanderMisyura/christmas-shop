import './main.scss';

import fillGiftsSection from './scripts/fillGiftsSection';
import toggleSidebar from './scripts/processSidebar';
import scrollBtn from './scripts/scrollBtn';
import Slider from './scripts/slider';
import Timer from './scripts/timer';

fillGiftsSection();
toggleSidebar();
scrollBtn();

const slider = new Slider(document.querySelector('.slider-row'));
slider.listen();

const timer = new Timer(document.querySelector('.timer'));
timer.run();
