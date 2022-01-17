## Como usar
Faça uma requisição **GET** para a URL:
```
https://apis013.vercel.app/api/feeds/{FEED_URL}
```
Substitua `{FEED_URL}` por um link de feed, gerado no google alerts formatado **URL-encoded**<br/>
Exemplo: `https%3A%2F%2Fwww.google.com.br%2Falerts%2Ffeeds%2F12010470048634352932%2F2653147459434191372`

Isso retornará a URL de todos as últimas notícias, salve-as em seu banco de dados