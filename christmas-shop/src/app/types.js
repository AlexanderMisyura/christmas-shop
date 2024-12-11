/**
 * An object structure to be consumed by router loader.
 * @typedef {Object} RouteObj
 * @property {string} pathname
 * @property {Function} callback
 */

/**
 * @typedef {Object} StateObj
 * @property {Boolean} isSidebarOpen
 * @property { 3 | 6 } sliderSteps
 * @property {'/' | '/gifts'} currentPage
 * @property {Object[]} gifts
 */

/**
 * @typedef {(state: StateObj) => void} SubscriberCb
 */

/**
 * @typedef {Partial<StateObj>} PartialStateObj
 */
