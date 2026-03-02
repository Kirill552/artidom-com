import { strict as assert } from 'node:assert';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
    getResidentialLocalPage,
    residentialLocalPageSlugs,
    resolveResidentialLocalPage,
} from './residential-local-pages.ts';

test('residential local SEO pages expose expected slugs', () => {
    assert.deepEqual(residentialLocalPageSlugs, ['bar', 'podgorica', 'budva', 'cijena']);
});

test('every residential local SEO page points to an existing public image', () => {
    for (const slug of residentialLocalPageSlugs) {
        const page = getResidentialLocalPage(slug);
        assert.ok(page, `Page ${slug} should exist`);

        const filePath = path.join(process.cwd(), 'public', page.image.replace(/^\//, ''));
        assert.ok(existsSync(filePath), `Missing image for ${slug}: ${filePath}`);
    }
});

test('resolved residential local page content keeps FAQ items', () => {
    const page = getResidentialLocalPage('cijena');
    assert.ok(page);

    const resolved = resolveResidentialLocalPage(page, 'sr');
    assert.equal(resolved.faqs.length, 4);
    assert.match(resolved.metaTitle, /Cijena|Kuhinje/);
});
