import State from './state.js';
import Router from './router.js';
import Page from './components/page.js';

const ROUTES = [{ pathname: '/' }, { pathname: '/gifts/' }];

export default class App {
  /** @type {State} */
  state;

  /** @type {Router} */
  router;

  constructor() {
    this.state = new State();
    this.router = new Router(
      ROUTES.map((route) => ({
        ...route,
        callback: () =>
          this.state.updateState({
            currentPage: /** @type {PartialStateObj['currentPage']} */ (
              route.pathname
            ),
          }),
      }))
    );

    this.page = new Page(
      { callbacks: { linkHandler: this.router.handleLink } },
      this.state
    );
  }

  run() {
    this.page.mount();
  }
}
