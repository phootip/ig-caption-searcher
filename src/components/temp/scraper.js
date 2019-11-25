
const puppeteer = require('puppeteer');
const fetch = require('node-fetch')
// export const scraper = async (accountUrl) => {
const scraper = async (accountUrl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(accountUrl);
  await autoScroll(page)
  // await page.screenshot({
  //   path: 'yourSite.png',
  //   fullPage: true
  // });
  // let body = await page.evaluate(() => document.body.innerHTML);
  let body = await page.content()
  await browser.close();
  console.log(body)
  return body
};
// scraper("https://www.instagram.com/sunsetwithbubbles/")

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

(async () => {
  const response = await fetch("https://cors-anywhere.herokuapp.com/https://example.com", {
    // const response = await fetch("https://backend-dot-try-puppeteer.appspot.com/run", {
    "credentials": "omit",
    "headers": {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:70.0) Gecko/20100101 Firefox/70.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "multipart/form-data; boundary=---------------------------366457262641028381487091119",
      "x-requested-with": "example.com"
    },
    "referrer": "https://try-puppeteer.appspot.com/",
    "body": "-----------------------------366457262641028381487091119\r\nContent-Disposition: form-data; name=\"file\"; filename=\"blob\"\r\nContent-Type: text/javascript\r\n\r\nconst browser = await puppeteer.launch();\n\nconst page = await browser.newPage();\nawait page.goto('https://www.instagram.com/sunsetwithbubbles/');\nawait page.evaluate(async () => {\n    await new Promise((resolve, reject) => {\n      var totalHeight = 0;\n      var distance = 100;\n      var timer = setInterval(() => {\n        var scrollHeight = document.body.scrollHeight;\n        window.scrollBy(0, distance);\n        totalHeight += distance;\n\n        if (totalHeight >= scrollHeight) {\n          clearInterval(timer);\n          resolve();\n        }\n      }, 100);\n    });\n  });\nconsole.log(await page.content());\n// await  page.screenshot({path: 'screenshot.png'});\nawait browser.close();\n\r\n-----------------------------366457262641028381487091119--\r\n",
    "method": "POST",
    "mode": "cors",
  });
  // console.log(await response.json())
  console.log(await response.text())
})()

