import test from 'node:test';
import assert from 'node:assert/strict';
import { resizeContactPhotos } from '../src/lib/resizeContactPhotos.ts';
const file = (type = 'image/jpeg', size = 1) => ({ type, size });
test('rejects more than three photos before decoding', async () => {
  await assert.rejects(resizeContactPhotos(Array.from({ length: 4 }, () => file())), { code: 'count' });
});
test('rejects unsupported attachments and oversized sources', async () => {
  await assert.rejects(resizeContactPhotos([file('application/pdf')]), { code: 'type' });
  await assert.rejects(resizeContactPhotos([file('image/jpeg', 26 * 1024 * 1024)]), { code: 'size' });
});
test('no attachment is a valid request', async () => {
  assert.deepEqual(await resizeContactPhotos([]), []);
});
