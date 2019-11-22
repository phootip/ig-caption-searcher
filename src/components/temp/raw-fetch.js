const fetch = require('node-fetch');
var fs = require('fs');
(async () => {
  // const response = await fetch("https://www.instagram.com/sunsetwithbubbles/", {
  const response = await fetch("https://www.instagram.com/phootip/", {
  })
  const content = await response.text()
  fs.writeFile('./phootip.html', content, () => {
    console.log("done")
  })
})()
