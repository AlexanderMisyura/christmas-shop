export default function svgChunkTemplate(svgChunk, className) {
  return `
<svg class="${className}" viewBox="${svgChunk.viewBox}">
  <use href="#${svgChunk.id}"></use>
</svg>
`;
}
