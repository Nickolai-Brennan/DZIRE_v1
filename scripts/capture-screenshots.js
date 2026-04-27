#!/usr/bin/env node
/**
 * Captures full-page screenshots of the running frontend
 * at multiple routes and viewport sizes.
 *
 * Usage: node scripts/capture-screenshots.js
 * Expects the frontend to be served on http://localhost:3000
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://localhost:3000';
const OUT_DIR = process.env.SCREENSHOT_OUT_DIR || path.join(process.cwd(), 'screenshots');

const routes = [
  { name: 'home', path: '/' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'login', path: '/login' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    for (const route of routes) {
      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 15000,
        });
        const file = path.join(OUT_DIR, `${vp.name}-${route.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`Saved: ${file}`);
      } catch (err) {
        console.warn(`Could not screenshot ${route.path} (${vp.name}): ${err.message}`);
      }
    }

    await page.close();
  }

  await browser.close();
})();
