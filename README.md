# Instagram Caption Searcher
Have you ever wondered 'Have I used this caption before', well, at least I have. ig-caption-searcher is a website that scrape Instagram and let you search your own caption. It's hosted on github-pages since it doesn't need any server-side component. It currently only is able to scrape public account only, wanna know why? [here](#why-we-can't-scrape-private-account)

## Tools
- Vue
- Time
- My brain
- many other little components
- Some code from [reference](#reference), and other sources that I for got

## Do we track anything?
Yes, we track page visits and number of fetch requests sent with [countapi](https://countapi.xyz/).

## Reference
* https://dev.to/teroauralinna/how-to-fetch-your-public-photos-from-instagram-without-the-api-3m50
* https://blog.apify.com/scrape-instagram-posts-comments-and-more-21d05506aeb3
* https://codepen.io/dimorin/pen/ZdebGR
* https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore

## Why we can't scrape Private Account
Instagram has been closing their application registration to access their API for quite a while and doesn't seem like they will open it for us, hence getting access to private posts will involve cookies sharing or other huge work around. We can discuss together, if you want this feature.

## Why is dist sitting on the repository? Don't you know how to .gitignore?
It's my first time playing with github-pages and git subtree, so I'm kind of make a mistake. Whatever, this project isn't that big anyway
