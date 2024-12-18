export default class Router {
  /** @type {RouteObj[]} */
  routeObj;

  /** @param {RouteObj[]} routeObjects */
  constructor(routeObjects) {
    this.routeObjects = routeObjects;
    this.initialLoad();

    window.addEventListener('popstate', () => this.initialLoad());
  }

  initialLoad() {
    const currentPathname = this.getCurrentPathname();
    const currentHash = this.getCurrentHash();
    this.load(currentPathname, currentHash);
  }

  /**
   * Navigates to the specified pathname.
   * @param {string} pathname
   * @param {string} hash
   * @returns {void}
   */
  load(pathname, hash) {
    const routeObj = this.getCurrentRouteObj(pathname);

    if (!routeObj) {
      this.navigate('/');
    } else {
      routeObj.callback();
      this.scrollToHashElement(hash);
    }
  }

  /**
   * Returns current URL full href string.
   * @returns {string}
   */
  getCurrentHref() {
    return window.location.href;
  }

  /**
   * Returns current URL pathname string.
   * @returns {string}
   */
  getCurrentPathname() {
    return window.location.pathname;
  }

  /**
   * Returns current URL hash string.
   * @returns {string}
   */
  getCurrentHash() {
    return window.location.hash;
  }

  /**
   * Scrolls the page to the element which id matches the url hash if any.
   * @param {string} hash
   * @returns {void}
   */
  scrollToHashElement(hash) {
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }

  /**
   * Returns the corresponding object from the route array.
   * @param {string} pathname
   * @returns {RouteObj | null}
   */
  getCurrentRouteObj(pathname) {
    const currentRouteObj = this.routeObjects.find(
      (route) => route.pathname === pathname
    );
    if (!currentRouteObj) return null;

    return currentRouteObj;
  }

  /**
   * Adds path to browser's session history stack.
   * @param {string} href
   * @returns {void}
   */
  navigate(href) {
    const url = new URL(href, window.location.origin);
    window.history.pushState({}, '', url);

    this.load(url.pathname, url.hash);
  }

  /**
   * Link handler.
   * @param {Event} e
   * @returns {void}
   */
  handleLink = (e) => {
    e.preventDefault();
    const { currentTarget } = e;
    if (currentTarget instanceof HTMLAnchorElement) {
      const currentHref = this.getCurrentHref();
      const url = new URL(currentTarget.href);
      const linkHash = url.hash;

      if (currentHref === currentTarget.href && linkHash) {
        this.scrollToHashElement(linkHash);
      } else if (currentHref !== currentTarget.href) {
        this.navigate(currentTarget.href);
      }
    }
  };
}
