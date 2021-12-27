# Curso da Udmey [BETA]
Com essa API você consegue capturar os detalhes dos cursos passando apenas a sua URL.
<br>
**Contribua com o crescimento dessa API:** [Clique aqui](https://github.com/misterioso013/apis/blob/main/CONTRIBUTING.md).

## Como usar
Faça uma requisição **GET** para a URL:
```
https://apis013.vercel.app/api/udemy/{COURSE_URL}
```
Substitua `{COURSE_URL}` por um link de qualquer Curso da Udemy com o formato **URL-encoded**<br/>
Exemplo: `https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fweb-completo%2F`

## Resultados
Você Receberá um JSON em caso de sucesso com os valores no padrão a seguir:
```
{
  "main": {
    "title": "Titulo do Curso",
    "description": "Descrição do curso",
    "image": "https://udemy.com/image-do-curso.jpg",
    "url": "https://www.udemy.com/course/url-aqui",
    "category": "Development",
    "price": "$199.99"
  },
  "stats": {
    "students": "92,778 students",
    "rating": 4.7236567,
    "num_reviews": 30104
  },
  "author": {
    "url": "https://www.udemy.com/user/professor/",
    "title": "Jorge Sant Ana",
    "image_50x50": "https://udemy.com/image-do-professor.jpg",
    "display_name": "Mega School",
    "initials": "MS"
  },
  "language": {
    "code": "pt",
    "title": "Portuguese"
  },
  "content": "=PHA+RG9taW5lIFdlYiAtIDIwIEN1cnNv...."
}
```
## O que construir?
Você poderá desenvolver Chatbots, sites, blogs e/ou aplicaivos.<br>
Ou junte-se a nós e  venha desenvolver algo grande, entre no nosso [Grupo do Telegram](https://t.me/hd_group)