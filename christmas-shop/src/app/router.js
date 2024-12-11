export default class Router {
  /** @type {RouteObj[]} */
  routeObj;

  /** @param {RouteObj[]} routeObj */
  constructor(routeObj) {
    this.routeObj = routeObj;
    this.initialLoad();

    window.addEventListener('popstate', () => this.initialLoad());
  }

  initialLoad() {
    const currentHref = this.getCurrentHref();
    this.load(currentHref);
  }

  /**
   * Navigates to the specified pathname.
   * @param {string} pathname
   * @returns {void}
   */
  load(pathname) {
    const routeObj = this.getCurrentRouteObj(pathname);

    if (!routeObj) {
      this.navigate('/');
    } else {
      routeObj.callback();
    }
  }

  /**
   * Returns current URL string.
   * @returns {string}
   */
  getCurrentHref() {
    return window.location.href;
  }

  /**
   * Returns the corresponding object from the route array.
   * @param {string} pathname
   * @returns {RouteObj | null}
   */
  getCurrentRouteObj(pathname) {
    const currentRouteObj = this.routeObj.find(
      (route) => route.pathname === pathname
    );
    if (currentRouteObj) return currentRouteObj;

    return null;
  }

  /**
   * Adds path to browser's session history stack.
   * @param {string} href
   * @returns {void}
   */
  navigate(href) {
    const url = new URL(href, window.location.origin);
    window.history.pushState({}, '', url.pathname);

    this.load(url.pathname);
  }

  /**
   * Link handler.
   * @param {Event} e
   * @returns {void}
   */
  handleLink = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target instanceof HTMLElement) {
      const link = target.closest('a');
      if (link instanceof HTMLAnchorElement) {
        const currentHref = this.getCurrentHref();
        if (currentHref !== link.href) {
          this.navigate(link.href);
        }
      }
    }
  };
}
