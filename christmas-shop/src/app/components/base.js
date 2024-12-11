/** @module BaseComponent */

/**
 * A base component that other components extend.
 * @class Base Component
 */
export default class BaseComponent {
  /**
   * @type {HTMLElement} - HTML element that represents the component.
   */
  element;

  /**
   * An array of child components stored in the Base component.
   * @type {BaseComponent[]} - Array with child components.
   */
  children = [];

  /**
   * App's state.
   * @type {State | null} - An instance of the State class.
   */
  state;

  /**
   * Creates a new Base component.
   * @param {Props} props - Component's properties parameters.
   * @param {BaseComponent[] | BaseComponent} [children] - Child components or elements.
   * @param {State} [state]
   */
  constructor(props, children, state) {
    const elementTagName = props.elementTagName || 'div';
    const element = document.createElement(elementTagName);
    this.element = element;

    this.appendChildElements(children);
    this.setText(props.text);

    this.addClasses(props.classList);
    this.setDataAttributes(props.dataset);
    // eslint-disable-next-line no-param-reassign
    delete props.classList;

    Object.assign(this.element, props);

    if (state) {
      this.state = state;
    } else {
      this.state = null;
    }
  }

  /**
   * Returns the component's HTML element.
   * @returns {HTMLElement} The HTML element representing the component.
   */
  getElement() {
    return this.element;
  }

  /**
   * Returns the component's HTML element.
   * @returns {BaseComponent[]} The HTML element representing the component.
   */
  getChildComponents() {
    return this.children;
  }

  /**
   * Appends a child component or an array of components to the component element.
   * @param {BaseComponent[] | BaseComponent | undefined} children - An array of components or HTML elements or a single component or HTML element to append.
   * @returns {BaseComponent} BaseComponent with appended children.
   */
  appendChildElements(children) {
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => this.appendSingleChild(child));
      } else {
        this.appendSingleChild(children);
      }
    }

    return this;
  }

  /**
   * Appends a child component to the component element.
   * @param {BaseComponent} child - Component or HTML element to append.
   * @returns {BaseComponent} BaseComponent with appended child.
   */
  appendSingleChild(child) {
    if (child instanceof BaseComponent) {
      this.element.append(child.getElement());
      this.children.push(child);
    }

    return this;
  }

  /**
   * Sets the component's text content.
   * @param {string | undefined} text - A string of text to display.
   * @returns {BaseComponent} BaseComponent with set text content.
   */
  setText(text) {
    if (text) {
      this.element.textContent = text;
    }

    return this;
  }

  /**
   * Adds CSS classes to the component.
   * @param {string[] | string | undefined} classes - An array of CSS class strings or a single class string.
   * @returns {BaseComponent} BaseComponent with added CSS classes.
   */
  addClasses(classes) {
    if (classes) {
      if (Array.isArray(classes)) {
        this.element.classList.add(...classes);
      } else {
        this.element.classList.add(classes);
      }
    }

    return this;
  }

  /**
   * Removes CSS classes from the component.
   * @param {string[] | string | undefined} classes - An array of CSS class strings or a single class string.
   * @returns {BaseComponent} BaseComponent with removed CSS classes.
   */
  removeClasses(classes) {
    if (classes) {
      if (Array.isArray(classes)) {
        this.element.classList.remove(...classes);
      } else {
        this.element.classList.remove(classes);
      }
    }

    return this;
  }

  /**
   * Toggles the component's CSS classes.
   * @param {string[] | string | undefined} classes - An array of CSS class strings or a single class string.
   * @returns {BaseComponent} BaseComponent with toggled CSS classes.
   */
  toggleClasses(classes) {
    if (classes) {
      if (Array.isArray(classes)) {
        classes.forEach((className) =>
          this.element.classList.toggle(className)
        );
      } else {
        this.element.classList.toggle(classes);
      }
    }

    return this;
  }

  /**
   * Adds data attributes to the component.
   * @param {DataAttribute[] | undefined} dataset - An array of objects representing data attributes.
   * @returns {BaseComponent} BaseComponent with set data attributes.
   */
  setDataAttributes(dataset) {
    if (dataset && dataset.length > 0) {
      dataset.forEach((dataObj) => {
        this.element.dataset[dataObj.key] = dataObj.value;
      });
    }

    return this;
  }

  /**
   * Adds attributes to the component.
   * @param {keyof Props} attribute
   * @param {string} value
   * @returns {BaseComponent}
   */
  setAttributes(attribute, value) {
    this.element.setAttribute(attribute, value);

    return this;
  }

  /**
   * Removes component's HTML element and its child components from the DOM.
   * @returns {void}
   */
  removeElement() {
    this.removeChildren();
    this.element.remove();
  }

  /**
   * Removes component's child components from the DOM.
   * @returns {void}
   */
  removeChildren() {
    this.children.forEach((child) => child.removeElement());
    this.children = [];
  }

  /**
   * Adds event listener.
   * @param {keyof DocumentEventMap} eventType - The type of the Event.
   * @param {EventListenerOrEventListenerObject} handler - A function or an object with handleEvent() method.
   * @returns {void}
   */
  addListener(eventType, handler) {
    this.element.addEventListener(eventType, handler);
  }

  /**
   * Removes event listener.
   * @param {keyof DocumentEventMap} eventType - The type of the Event.
   * @param {EventListenerOrEventListenerObject} handler - A function or an object with handleEvent() method.
   * @returns {void}
   */
  removeListener(eventType, handler) {
    this.element.removeEventListener(eventType, handler);
  }

  /**
   * Subscribes to the state updates.
   * @param {State} state - An instance of the State class.
   * @param {SubscriberCb | SubscriberCb[]} updateCallbacks
   * @returns {void}
   */
  subscribe(state, updateCallbacks) {
    if (state) {
      this.state = state;

      if (Array.isArray(updateCallbacks)) {
        updateCallbacks.forEach((callback) => {
          if (this.state) this.state.addSubscribers(callback);
        });
      } else {
        this.state.addSubscribers(updateCallbacks);
      }
    }
  }

  /**
   * Unsubscribes from the state updates.
   * @param {SubscriberCb} updateCallback
   * @returns {void}
   */
  unsubscribe(updateCallback) {
    if (this.state) {
      this.state.removeSubscriber(updateCallback);
    }
  }

  /**
   * Updates the App's state.
   * @param {PartialStateObj} newState
   * @returns {void}
   */
  updateState(newState) {
    this.state?.updateState(newState);
  }
}
