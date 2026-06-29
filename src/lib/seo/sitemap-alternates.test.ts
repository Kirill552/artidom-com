import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildSharedPathAlternates,
  buildSitemapAlternates,
} from './sitemap-alternates.ts';

test('shared localized paths include every locale and x-default', () => {
  assert.deepEqual(buildSharedPathAlternates('/catalog'), {
    languages: {
      sr: 'https://artidom.art/sr/catalog',
      en: 'https://artidom.art/en/catalog',
      ru: 'https://artidom.art/ru/catalog',
      'x-default': 'https://artidom.art/sr/catalog',
    },
  });
});

test('shared localized root path is a valid alternates cluster', () => {
  assert.deepEqual(buildSharedPathAlternates(''), {
    languages: {
      sr: 'https://artidom.art/sr',
      en: 'https://artidom.art/en',
      ru: 'https://artidom.art/ru',
      'x-default': 'https://artidom.art/sr',
    },
  });
});

test('single-locale content does not emit hreflang alternates', () => {
  assert.equal(buildSitemapAlternates({ en: '/blog/custom-kitchens-bar-montenegro' }), undefined);
});
