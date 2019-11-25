const fetch = require('node-fetch');
var fs = require('fs');
(async () => {
  // const response = await fetch("https://www.instagram.com/sunsetwithbubbles/", {
  // const response = await fetch("https://www.instagram.com/phootip/", {
  // const response = await fetch("https://www.instagram.com/give.me.some.tip/", {
  const response = await fetch("https://www.instagram.com/qqqasefw/", {
  })
  const content = await response.text()
  fs.writeFile('./qqqasefw.html', content, () => {
    console.log("done")
  })
})()
