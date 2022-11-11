import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { IHome, IQuote } from './api/types';

export default function Home({ quote }: IHome) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quotes</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@800&display=swap'
          rel='stylesheet'
        />
      </Head>

      {quote && (
        <article className={styles.container}>
          <blockquote className={styles.blockquote}>
            <p>{quote.quote}</p>
            <cite>&mdash; {quote.author}</cite>
          </blockquote>
        </article>
      )}
    </div>
  );
}


export const getServerSideProps: GetServerSideProps<IHome> = async () => {
  const response = await fetch(
    'https://gist.githubusercontent.com/tulioribeiro/d3867020337d8cd6f05cc1a95ee3ab39/raw/d22d71e63c3f74703ee19909b8329399f38382fb/notion-quotes.json'
  );

  const quotes: IQuote[] = await response.json()
  const quoteIndex = Math.floor(Math.random() * quotes.length);

  return {
    props: {
      quote: quotes[quoteIndex]
    }
  }
}