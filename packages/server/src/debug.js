import debug from 'debug';
import pkg from '../package.json';

export function createDebug(namespace) {
  return debug(`${pkg.name}:${namespace}`);
}
