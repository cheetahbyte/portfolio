// Run: node tests/icon-placement.mjs
import assert from 'node:assert/strict';
import { placeIcon } from '../src/icon-placement.ts';

const anchor = { left: 100, right: 180, top: 100, bottom: 122 };
const viewport = { width: 400, height: 300 };
const above = { left: 90, right: 200, top: 70, bottom: 95 };
const below = { left: 90, right: 200, top: 127, bottom: 150 };
assert.deepEqual(placeIcon(anchor, [anchor], viewport), { left: 132.5, top: 79 });
assert.deepEqual(placeIcon(anchor, [anchor, above], viewport), { left: 132.5, top: 128 });
assert.equal(placeIcon(anchor, [anchor, above, below], viewport), null);
assert.deepEqual(placeIcon({ ...anchor, top: 10, bottom: 32 }, [], viewport), { left: 132.5, top: 38 });
assert.equal(placeIcon({ ...anchor, left: -20, right: 0 }, [], viewport), null);
assert.equal(placeIcon(anchor, [above], { ...viewport, height: 140 }), null);
assert.equal(placeIcon(anchor, [{ left: 149, right: 180, top: 79, bottom: 94 }, below], viewport), null, 'Safety padding avoids grazing text');
console.log('Icon collision checks passed.');
