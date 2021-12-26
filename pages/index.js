import Head from "next/head"
export default function Home() {
  return (
   <div>
     <Head>
       <title>Misterioso013 - APIs</title>
     </Head>
     <h1>Minhas APIs</h1>
     <h2><a href="https://github.com/misterioso013/apis">Veja a Documentação</a></h2>
     <p>
       Olá, eu me chamo Rosiel Victor e aqui está hospedado as minhas APIs.<br/>
       Você poderá utilizar sem qualquer restrição, mas se precisar de um número muito grande de requisições, recomendo fazer o Deploy do código fonte em sua própria conta da Vercel!
     </p>
   </div>
  )
}
