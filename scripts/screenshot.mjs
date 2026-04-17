import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const targets = [
  { url: 'https://www.nanoplasticity.com', out: 'nanoplasticity.png' },
  { url: 'https://www.ai-evolution.com.au', out: 'ai-evolution.png' },
  { url: 'https://www.ai-evolution.com.au/academy', out: 'ai-academy.png' },
];

const outDir = resolve('public/screenshots');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});

for (const { url, out } of targets) {
  const page = await ctx.newPage();
  console.log(`→ ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: resolve(outDir, out),
    fullPage: false,
    type: 'png',
  });
  await page.close();
  console.log(`  saved ${out}`);
}

await browser.close();
