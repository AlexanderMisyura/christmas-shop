/**
 * Creates SVG fragment from SVG chunk
 * @param {{id: string, viewBox: string}} svgChunk
 * @param {string} className
 * @return {string}
 */
export default function svgChunkTemplate(svgChunk, className) {
  return `
<svg class="${className}" viewBox="${svgChunk.viewBox}">
  <use href="#${svgChunk.id}"></use>
</svg>
`;
}
