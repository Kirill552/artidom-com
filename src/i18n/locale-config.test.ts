import assert from 'node:assert/strict';
import test from 'node:test';

import {
  appLocales,
  defaultLocale,
  mapLegacyLocalePathname,
  replaceLocaleInPathname,
} from './locale-config.ts';

test('uses Serbian as default locale and keeps English as secondary locale', () => {
  assert.deepEqual(appLocales, ['sr', 'en']);
  assert.equal(defaultLocale, 'sr');
});

test('replaces current locale prefix when switching languages', () => {
  assert.equal(replaceLocaleInPathname('/en/projects', 'sr'), '/sr/projects');
  assert.equal(replaceLocaleInPathname('/sr/catalog/oak-kitchen-unit', 'en'), '/en/catalog/oak-kitchen-unit');
});

test('adds locale prefix when pathname has no locale segment', () => {
  assert.equal(replaceLocaleInPathname('/projects', 'en'), '/en/projects');
  assert.equal(replaceLocaleInPathname('/', 'sr'), '/sr');
});

test('maps legacy German routes to Serbian equivalents', () => {
  assert.equal(mapLegacyLocalePathname('/de'), '/sr');
  assert.equal(mapLegacyLocalePathname('/de/projects'), '/sr/projects');
  assert.equal(mapLegacyLocalePathname('/en/projects'), null);
});
