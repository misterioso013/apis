import  puppeteer from "puppeteer";
import UserAgent from "user-agents";
import chrome from 'chrome-aws-lambda';

export default async function getInfo(url) {
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
    const result = await page.evaluate( () => {
      const thumbnail = document.querySelector('meta[property="og:image"]').content;
      const description = document.querySelector('meta[property="og:description"]').content;
      const title = document.querySelector('meta[property="og:title"]').content;

      return {
        title: title,
        content: description,
        thumbnail: thumbnail,
        url: window.location.href
      }
    });

    return result;
}