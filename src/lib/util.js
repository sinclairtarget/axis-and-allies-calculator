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

export function remove(arr, predicate) {
  let removed = arr.filter(predicate);
  let leftOver = arr.filter(e => !predicate(e));
  arr.length = 0;
  arr.push(...leftOver);
  return removed;
}

export function sum(arr, accessor) {
  return arr.reduce((s, e) => s + accessor(e), 0);
}
