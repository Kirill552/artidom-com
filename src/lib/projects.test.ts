import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { projects } from './projects.ts';

const publicDir = path.join(process.cwd(), 'public');
const expectedSlugs = [
  'warm-minimal-apartment',
  'compact-apartment-kitchen-storage',
  'graphite-apartment-kitchen',
  'residential-joinery-details',
  'horeca-counter-collection',
  'international-school-montenegro',
];

test('projects showcase includes the planned case studies and collections', () => {
  assert.deepEqual(
    projects.map((project) => project.slug),
    expectedSlugs,
  );
});

test('every project points to existing public images', () => {
  for (const project of projects) {
    assert.ok(
      project.images.length >= 2,
      `${project.slug} should have at least two gallery images`,
    );
    assert.ok(
      project.images.includes(project.coverImage),
      `${project.slug} cover image should be included in the gallery`,
    );

    for (const imagePath of project.images) {
      const relativePath = imagePath.replace(/^\//, '').replace(/\//g, path.sep);
      assert.ok(
        existsSync(path.join(publicDir, relativePath)),
        `Missing image for ${project.slug}: ${imagePath}`,
      );
    }
  }
});
