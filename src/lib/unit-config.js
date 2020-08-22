import * as valid from './valid.js';

export default {
  'infantry': {
    'name': 'Infantry',
    'symbol': 'I',
    'attack': 1,
    'defense': 2,
    'cost': 3,
    'move': 1,
    'domain': 'land',
    'valid': valid.landUnit
  },
  'artillery': {
    'name': 'Artillery',
    'symbol': 'A',
    'attack': 2,
    'defense': 2,
    'cost': 4,
    'move': 1,
    'domain': 'land',
    'valid': valid.landUnit
  },
  'tank': {
    'name': 'Tank',
    'symbol': 'T',
    'attack': 3,
    'defense': 3,
    'cost': 6,
    'move': 2,
    'domain': 'land',
    'valid': valid.landUnit
  },
  'aa': {
    'name': 'Anti-Aircraft Artillery',
    'symbol': 'AA',
    'attack': 0,
    'defense': 0,
    'cost': 5,
    'move': 1,
    'domain': 'land',
    'valid': valid.antiair
  },
  'fighter': {
    'name': 'Fighter',
    'symbol': 'F',
    'attack':  3,
    'defense': 4,
    'cost': 10,
    'move': 4,
    'domain': 'air',
    'valid': valid.always
  },
  'bomber': {
    'name': 'Bomber',
    'symbol': 'B',
    'attack': 4,
    'defense': 1,
    'cost': 12,
    'move': 6,
    'domain': 'air',
    'valid': valid.always
  },
  'submarine': {
    'name': 'Submarine',
    'symbol': 'SS',
    'attack': 2,
    'defense': 1,
    'cost': 6,
    'move': 2,
    'domain': 'sea',
    'valid': valid.seaUnit
  },
  'transport': {
    'name': 'Transport',
    'symbol': 'AP',
    'attack': 0,
    'defense': 0,
    'cost': 7,
    'move': 2,
    'domain': 'sea',
    'valid': valid.amphibious
  },
  'destroyer': {
    'name': 'Destroyer',
    'symbol': 'DD',
    'attack': 2,
    'defense': 2,
    'cost': 8,
    'move': 2,
    'domain': 'sea',
    'valid': valid.seaUnit
  },
  'cruiser': {
    'name': 'Cruiser',
    'symbol': 'CA',
    'attack': 3,
    'defense': 3,
    'cost': 12,
    'move': 2,
    'domain': 'sea',
    'valid': valid.amphibious
  },
  'carrier': {
    'name': 'Aircraft Carrier',
    'symbol': 'CV',
    'attack': 1,
    'defense': 2,
    'cost': 14,
    'move': 2,
    'domain': 'sea',
    'valid': valid.seaUnit
  },
  'battleship': {
    'name': 'Battleship',
    'symbol': 'BB',
    'attack': 4,
    'defense': 4,
    'cost': 20,
    'move': 2,
    'domain': 'sea',
    'valid': valid.amphibious
  },
};
