import sharp from 'sharp';
await sharp('public/og-source.svg').png().toFile('public/og.png');
