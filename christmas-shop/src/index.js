import './main.scss';

import fillGiftsSection from './scripts/fillGiftsSection';
import toggleSidebar from './scripts/processSidebar';
import scrollBtn from './scripts/scrollBtn';
import Slider from './scripts/slider';

fillGiftsSection();
toggleSidebar();
scrollBtn();

const slider = new Slider(document.querySelector('.slider-row'));
slider.listen();
