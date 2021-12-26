import  puppeteer from "puppeteer";
import UserAgent from "user-agents";
import { Base64 } from 'js-base64';
import chrome from 'chrome-aws-lambda';

export default async function handler(req, res) {
  const url =  req.query.url;
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
   // await page.goto('https://www.udemy.com/course/guia-de-certificacoes-cloud-computing-2020/');
   await page.goto(url);

  // Parte Principal  [Título, Imagem, Descrição  e Link ]
  const main = await page.evaluate(() =>{
    return{
      title: document.querySelector("h1").innerText,
      description: document.querySelector("div[class='udlite-text-md clp-lead__headline'][data-purpose='lead-headline']").innerText,
      image: document.querySelector("meta[property='og:image']").content,
      url: window.location.href,
      category: document.querySelector("meta[property='udemy_com:category']").content,
     price: document.querySelector("meta[property='udemy_com:price']").content,
    }
  })
  // Estatísticas [Alunos,  Avaliações  -  Estrelas e Números, tamanho do curso em segundos]
  const stats = await page.evaluate( ()=>{

    let {rating, num_reviews} = JSON.parse(document.querySelector("div[class='ud-component--course-landing-page-udlite--rating']").dataset.componentProps);

    return{
      students: document.querySelector("div[data-purpose='enrollment']").innerText,
      rating: rating,
      num_reviews: num_reviews,
    };
  })

  const language = await page.evaluate( ()  => {
    let lang = document.querySelector("div[data-purpose='lead-course-locale']").innerText;
    return {
      code: JSON.parse(document.querySelector("#schema_markup script").innerText)[0]["inLanguage"],
      title: lang,
    }
  })

  // Dados do Criador do curso

  const author = await page.evaluate( ()=>{
    let {title, image_50x50, display_name, initials} = JSON.parse(document.querySelector(".ud-component--course-landing-page-udlite--instructor-links").dataset.componentProps).instructors[0];
    return {
      url: document.querySelector(".ud-component--course-landing-page-udlite--instructor-links a").href,
      title,
      image_50x50,
      display_name,
      initials
    }
  })

  // Conteúdo

  const content = await page.evaluate( ()=>{
    return `<p>${document.querySelector("div[class='udlite-text-md clp-lead__headline'][data-purpose='lead-headline']").innerText}</p><h2>${document.querySelector("div[data-purpose='course-description'] h2").innerText}</h2>${document.querySelector("div[data-purpose='course-description'] div[data-purpose='safely-set-inner-html:description:description']").innerHTML}<h2>${document.querySelector("div[data-purpose='target-audience'] h2").innerText}</h2><ul>${document.querySelector("div[data-purpose='target-audience'] ul").innerHTML}</ul>`;
  })

  //await page.screenshot({ path: 'example.png' });
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(
    {
      main,
      stats,
      author,
      language,
      content: Base64.encode(content),
    })
    await browser.close();
}
