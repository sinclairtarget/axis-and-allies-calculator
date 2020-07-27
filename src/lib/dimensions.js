export default class Dimensions {
  constructor(width, height, margin, padding) {
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.padding = padding;
  }

  panelWidth() {
    return this.width - this.margin.left - this.margin.right;
  };

  panelHeight() {
    return this.height - this.margin.top - this.margin.bottom;
  };

  plotWidth() {
    return this.panelWidth() - this.padding.left - this.padding.right;
  };

  plotHeight() {
    return this.panelHeight() - this.padding.top - this.padding.bottom;
  };
}
