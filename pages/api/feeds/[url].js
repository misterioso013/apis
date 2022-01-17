import  puppeteer from "puppeteer";
import UserAgent from "user-agents";
import chrome from 'chrome-aws-lambda';
import getInfo from "../../../lib/getInfo";

export default async function bbb(req, res) {
    const url = req.query.url;
    

  const browser = await puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {}
  );
  const page = await browser.newPage();
  await page.setUserAgent(UserAgent.toString())
    await page.goto(url);
    const data = await page.evaluate( () => {

        let feed = []

      const html = document.body.querySelectorAll('entry');
      for(i = 0; i < html.length; i++){
        const feed_link = html[i].querySelector('link').getAttribute('href');
        const urlParams = new URLSearchParams(feed_link);
        const link = urlParams.get('url');
        feed.push(link)
      }
      return feed;
    })
    await browser.close();

    res.json(
      data
    )
   
  
}