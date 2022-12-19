import Image from 'next/image';
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout';
import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([])
  const API_KEY = '24434dd522bb4d23bf73c8068f723146'

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=24434dd522bb4d23bf73c8068f723146')
      .then(res => res.json())
      .then(response => {
        const {articles} = response
        setArticles(articles)        
      })
    }, [])
  
    return (    
      <PageLayout title='NewsApp - Home'>
        <div className={styles.container}>
          {articles.length === 0 && <p>Loading ...</p>}
          {articles.length> 0 && articles.map((article, index) => (
            <article key={index}>
              <Image 
                src={article.urlToImage} 
                alt={`Image for the article ${article.title}`}
                width={auot}
                height={auto}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}
        </div>
      </PageLayout>    
  )
}
