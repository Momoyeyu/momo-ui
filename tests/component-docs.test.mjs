import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import * as react from '../lib-dist/index.js';
import * as vue from '../lib-dist/vue.js';

const interactive = new Set(['Button', 'IconButton', 'Switch', 'Slider', 'Field', 'Combobox', 'Dialog', 'Panel', 'ClockFace']);
const names = [...new Set([...Object.keys(react), ...Object.keys(vue)])].sort();

test('each public component has its own discoverable document', async () => {
  const homepage = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  for (const name of names) {
    assert.match(name, /^[A-Z][A-Za-z0-9]*$/);
    const slug = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    const html = await readFile(new URL('../dist/components/' + slug + '/index.html', import.meta.url), 'utf8');
    assert.ok(homepage.includes('/components/' + slug + '/"'), name + ' is in the catalog');
    assert.ok(html.includes('<h1>' + name + '</h1>'), name + ' is the page title');
    for (const heading of ['example', 'usage', 'api']) assert.ok(html.includes('id="' + heading + '"'), name + ': ' + heading);
    assert.equal(html.includes('<astro-island '), interactive.has(name), name + ' hydration');
  }
});
