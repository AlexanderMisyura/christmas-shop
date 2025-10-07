/**
 * @typedef {Object} DataAttribute - An array of objects representing data attributes.
 * @property {string} key - The name of the data attribute (with no "data-" prefix).
 * @property {string} value - The value of the data attribute.
 */

/**
 * @typedef {Extract<keyof HTMLElementTagNameMap, 'header' | 'div' | 'a' | 'img' | 'span' | 'nav' | 'ul' | 'li' | 'button' | 'main' | 'section' | 'h1' | 'footer' | 'h2' | 'p' | 'input' | 'label'>} TagType - The values of HTML tags
 */

/**
 * @typedef {Object<string, Function>} PropsCallbacks
 */

/**
 * @typedef {Object<string, *>} PropsCustomData
 */

/**
 * @typedef {Object} Props - Properties for component generation.
 * @property {keyof HTMLElementTagNameMap} [elementTagName] - Element's HTML tag.
 * @property {string} [text] - Element's text content (optional).
 * @property {string[] | string } [classList] - An array of CSS class names or a single CSS class string (optional).
 * @property {DataAttribute[]} [dataset] - Custom data attributes (optional).
 * @property {string} [style] - CSS styles as a string (optional).
 * @property {string} [id] - Unique id (optional).
 * @property {string} [href] - The URL the link goes to (for 'a' tag).
 * @property {string} [target] - Specifies where to open the linked document (for 'a' tag).
 * @property {string} [alt] - Alternative text for the image (for 'img' tag).
 * @property {string} [src] - A path to the source file (for 'img' tag).
 * @property {string} [width] - The width of the image (for 'img' tag).
 * @property {string} [height] - The height of the image (for 'img' tag).
 * @property {string} [type] - The type of the element (for 'button' or 'input' tags).
 * @property {string} [name] - The name of the input.
 * @property {string} [value] - The value of the input.
 * @property {PropsCallbacks} [callbacks] - An object containing callbacks to pass through components.
 * @property {PropsCustomData} [customData] - Additional properties with any name and any value (optional).
 */

/**
 * @typedef {{
 *   name: string,
 *   description: string,
 *   category: 'For Work' | 'For Health' | 'For Harmony'
 *   superpowers: {
 *     live: string,
 *     create: string,
 *     love: string,
 *     dream: string
 *   }
 * }} Gift
 */

/**
 * An object structure to be consumed by router loader.
 * @typedef {Object} RouteObj
 * @property {string} pathname
 * @property {Function} callback
 */

/**
 * @typedef {import('./state').default} State
 */

/**
 * @typedef {import('./router').default} Router
 */

/**
 * @typedef {{x: number, y: number}} CardCenterCoords
 */

/**
 * @typedef {Object} StateObj
 * @property {Boolean} isLoading
 * @property {Boolean} isSidebarOpen
 * @property {Boolean} isModalOpen
 * @property { 3 | 6 } sliderSteps
 * @property {'/' | '/gifts'} currentPage
 * @property {Gift[]} gifts
 * @property {Gift | null} giftModal
 * @property {string} activeCategory
 * @property {CardCenterCoords} cardCenterCoords
 */

/**
 * @typedef {(state: StateObj) => void} SubscriberCb
 */

/**
 * @typedef {Partial<StateObj>} PartialStateObj
 */

export default {};
