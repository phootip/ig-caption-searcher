axios = require('axios');

(async () => {
  const instagramRegExp = new RegExp(
    /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
  );
  const accountUrl = `https://www.instagram.com/qqqasefw/`;
  try {
    const response = await axios.get(accountUrl);
  } catch (err) {
    console.error(err.response.status);
  }
  // console.log(response)
  // const data = response.data.match(instagramRegExp)[1];
  // console.log(data)
})()
