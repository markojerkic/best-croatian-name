import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Navbar from '../components/navbar';
import Head from 'next/head';
import React from 'react';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <div>
      <Head>
        <title>Odabir najljepših hrvatskih imena</title>
        <meta property="og:title"
          content="Odabir najljepših hrvatskih imena" key="title" />
        <link rel="shortcut icon" href="/favicon_kockice.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
