import * as d3 from 'd3';

export function densityKey(day, period, direction) {
  let key = 'density';
  if (day && period && direction) {
    key = `density_${day}_${period}_${direction}`;
  }
  else if (day && period) {
    key = `density_${day}_${period}`;
  }
  else if (day) {
    key = `density_${day}`;
  }

  return key;
}

export function transl(x, y) {
  return "translate(" + x + "," + y + ")";
}

export function rot(degrees, x, y) {
  return "rotate(" + degrees + "," + x + "," + y + ")";
}

export function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
