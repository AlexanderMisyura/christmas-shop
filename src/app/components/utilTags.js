/// <reference path="../types.js" />

import BaseComponent from './base.js';

/** @typedef {import('../types').TagType} TagType */
/** @typedef {import('../types').Props} Props */

/**
 * @type {TagType[]}
 */
const tagArray = [
  'header',
  'div',
  'a',
  'img',
  'span',
  'nav',
  'ul',
  'li',
  'button',
  'main',
  'section',
  'h1',
  'footer',
  'h2',
  'p',
  'input',
  'label',
];

/**
 * An object that contains keys for most common tags and values for functions to create them via BaseComponent class.
 * @typedef {Record<TagType, (props?: Omit<Props, 'elementTagName'>, children?: (BaseComponent[] | BaseComponent)) => BaseComponent>} TagGenerator
 */

/**
 * Generates an object with tag keys and functions that returns new Base components.
 * @function
 * @param {TagType[]} tagArr
 * @returns {TagGenerator}
 */
function tagGenerator(tagArr) {
  const generator = tagArr.reduce((tagGenerators, tag) => {
    /**
     * Creates a function that returns new Base component.
     * @function tagFunction
     * @param {Omit<Props, 'elementTagName'>} [props]
     * @param {BaseComponent[] | BaseComponent} [children]
     * @returns {BaseComponent}
     */
    const generateTagFn = (props, children) =>
      new BaseComponent({ ...props, elementTagName: tag }, children);
    Object.assign(tagGenerators, { [tag]: generateTagFn });
    return tagGenerators;
  }, /** @type {TagGenerator} */ ({}));

  return generator;
}

export default tagGenerator(tagArray);
