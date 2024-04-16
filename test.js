const puppeteer = require('puppeteer-core');

const SBR_WS_ENDPOINT =
  'wss://brd-customer-hl_54e57b52-zone-scraping_browser1:imv64h4wkrqp@brd.superproxy.io:9515';

async function main() {
  console.log('Connecting to Scraping Browser...');
  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });
  try {
    const page = await browser.newPage();
    console.log('Connected! Navigating to https://example.com...');
    await page.goto('https://example.com');
    // CAPTCHA handling: If you're expecting a CAPTCHA on the target page, use the following code snippet to check the status of Scraping Browser's automatic CAPTCHA solver
    // const client = await page.createCDPSession();
    // console.log('Waiting captcha to solve...');
    // const { status } = await client.send('Captcha.waitForSolve', {
    //     detectTimeout: 10000,
    // });
    // console.log('Captcha solve status:', status);
    console.log('Navigated! Scraping page content...');
    const html = await page.content();
    console.log(html);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.stack || err);
  process.exit(1);
});
