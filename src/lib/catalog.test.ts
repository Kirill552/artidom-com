import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { catalogItems } from './catalog.ts';

const publicDir = path.join(process.cwd(), 'public');

test('catalog includes residential-first assortment plus one B2B direction', () => {
  assert.deepEqual(
    catalogItems.map((item) => item.slug),
    [
      'custom-apartment-kitchen',
      'warm-oak-kitchen-wall',
      'built-in-wardrobe-system',
      'entry-storage-wall',
      'service-counter-joinery',
    ],
  );
});

test('every catalog item points to existing public images', () => {
  for (const item of catalogItems) {
    assert.ok(item.images.length >= 2, `${item.slug} should have at least two gallery images`);
    assert.ok(item.images.includes(item.coverImage), `${item.slug} cover image should be included in gallery`);

    for (const imagePath of item.images) {
      const relativePath = imagePath.replace(/^\//, '').replace(/\//g, path.sep);
      assert.ok(
        existsSync(path.join(publicDir, relativePath)),
        `Missing image for ${item.slug}: ${imagePath}`,
      );
    }
  }
});
