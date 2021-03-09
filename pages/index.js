import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function fetchQuotes() {
      let response = await fetch(
        'https://api.github.com/gists/d3867020337d8cd6f05cc1a95ee3ab39'
      );
      response = await response.json();

      const quotes = JSON.parse(response.files['notion-quotes.json'].content);

      const quoteIndex = Math.floor(Math.random() * quotes.length);

      setQuote(quotes[quoteIndex]);
    }

    fetchQuotes();
  }, []);

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
