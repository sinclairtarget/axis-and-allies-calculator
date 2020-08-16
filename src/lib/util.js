import * as d3 from 'd3';

export function transl(x, y) {
  return "translate(" + x + "," + y + ")";
}

export function rot(degrees, x, y) {
  return "rotate(" + degrees + "," + x + "," + y + ")";
}

export function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}
