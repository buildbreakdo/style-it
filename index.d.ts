interface IStyle {
  it(css: string, rootElement: JSX.Element): JSX.Element;
}

declare const Style: IStyle;

export default Style;
