import Image from 'next/image';
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout';
import { useEffect, useState } from 'react';

export default function Home({ articles }) {
  return (    
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos articulos</p>}
        {articles.length> 0 && articles.map((article, index) => (
          <article key={index}>
            <Image 
              src={article.urlToImage} 
              alt={`Image for the article ${article.title}`}
              width={450}
              height={350}
              quality={50}
              layout='responsive'
              priority={index < 2}              
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </PageLayout>    
  );
};

// N requets -> se ejecuta 1 vez en build time (o para refrescar la pagina)

// export async function getStaticProps() {
//   const API_KEY = '24434dd522bb4d23bf73c8068f723146';
//   (`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`)
//   const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`)
//   const { articles } = await response.json()
//   return {
//     props: {
//       articles
//     }
//   };
// };

// N request -> se ejecuta N veces
// para datos que necesitas que sean MUY live
// tiene demasiados datos dinamicos

export async function getServerSideProps(context) {
  const API_KEY = '24434dd522bb4d23bf73c8068f723146';
  (`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`)
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`)
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  };
};
