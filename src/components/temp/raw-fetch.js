const fetch = require('node-fetch');
var fs = require('fs');
(async () => {
  // const response = await fetch("https://www.instagram.com/sunsetwithbubbles/", {
  // const response = await fetch("https://www.instagram.com/phootip/", {
  const response = await fetch("https://www.instagram.com/give.me.some.tip/", {
  })
  const content = await response.text()
  fs.writeFile('./give-me-some-tip.html', content, () => {
    console.log("done")
  })
})()
