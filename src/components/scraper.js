
const puppeteer = require('puppeteer');

export const scraper = async (accountUrl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(accountUrl);
  await autoScroll(page)
  // await page.screenshot({
  //   path: 'yourSite.png',
  //   fullPage: true
  // });
  let body = await page.evaluate(() => document.body.innerHTML);
  await browser.close();
  return body
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
