// import axios from "axios";
// import scraper from './scraper';
const fetch = require('node-fetch')
const instagramRegExp = new RegExp(
  /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
);
const fetchInstagramPhotos = async accountUrl => {
  const response = await fetch("https://cors-anywhere.herokuapp.com/https://backend-dot-try-puppeteer.appspot.com/run", {
    // const response = await fetch("https://backend-dot-try-puppeteer.appspot.com/run", {
    "credentials": "omit",
    "headers": {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:70.0) Gecko/20100101 Firefox/70.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Origin": "https://try-puppeteer.appspot.com/",
      "Content-Type": "multipart/form-data; boundary=---------------------------366457262641028381487091119",
      "x-requested-with": "https://backend-dot-try-puppeteer.appspot.com"
    },
    "referrer": "https://try-puppeteer.appspot.com/",
    "body": "-----------------------------366457262641028381487091119\r\nContent-Disposition: form-data; name=\"file\"; filename=\"blob\"\r\nContent-Type: text/javascript\r\n\r\nconst browser = await puppeteer.launch();\n\nconst page = await browser.newPage();\nawait page.goto('" + accountUrl + "');\nawait page.evaluate(async () => {\n    await new Promise((resolve, reject) => {\n      var totalHeight = 0;\n      var distance = 100;\n      var timer = setInterval(() => {\n        var scrollHeight = document.body.scrollHeight;\n        window.scrollBy(0, distance);\n        totalHeight += distance;\n\n        if (totalHeight >= scrollHeight) {\n          clearInterval(timer);\n          resolve();\n        }\n      }, 100);\n    });\n  });\nconsole.log(await page.content());\n// await  page.screenshot({path: 'screenshot.png'});\nawait browser.close();\n\r\n-----------------------------366457262641028381487091119--\r\n",
    "method": "POST",
    "mode": "cors"
  });
  let data = await response.json()
  data = data.log.match(instagramRegExp)[1];
  const json = JSON.parse(data.slice(0, -1));
  const edges =
    json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media
      .edges;
  const photos = edges.map(({ node }) => {
    return {
      url: `https://www.instagram.com/p/${node.shortcode}/`,
      thumbnailUrl: node.thumbnail_src,
      // displayUrl: node.display_url,
      caption: node.edge_media_to_caption.edges[0].node.text
    };
  });
  return photos;
};
export const resolveItems = async username => {
  // const resolveItems = async username => {
  return await fetchInstagramPhotos(`https://www.instagram.com/${username}/`);
};

// resolveItems('sunsetwithbubbles')
