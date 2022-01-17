import  puppeteer from "puppeteer";
import UserAgent from "user-agents";
import chrome from 'chrome-aws-lambda';
import getInfo from "../../../lib/getInfo";

export default async function bbb(req, res) {
    
    // Notícias do BBB

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
    await page.goto('https://www.google.com.br/alerts/feeds/12010470048634352932/2653147459434191372');

  

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

    let format =  [];
    let i = 0;
    let x = data.length <= 3? data.length: 3;
    for(i = 0; i < x; i++){
      const url = data[i];
      const info = getInfo(url);
      info.then((res) => {
        formart.push(res)
      })
      
    }
    res.json(
      format
    )
   
  
}