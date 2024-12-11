declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
