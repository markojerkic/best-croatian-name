import {NextPage} from 'next';
import React from 'react';

const InfoPage: NextPage = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold">Informacije</h1>
          <p className="py-6 bg-base-300 rounded-box p-6">
            Ovo je mini hobi projekt na kojemu ljudi mogu
            glasati koje hrvatsko ime je najljepše.
          </p>
          <div className="divider"></div>
          <h2 className="text-3xl font-bold">Izvor podataka</h2>
          <p className="py-6 bg-base-300 rounded-box p-6">
            Stranica sadrži po 500 najpopularnijih muških i ženskih imena
            koji su izvučeni iz python
            library-ja <a className="link"
              href="https://github.com/philipperemy/name-dataset"
              target="_blank" rel="noreferrer">name-dataset</a>.
            Filtrirana su samo hrvatska imena. Skup imena dolazi s
            podataka koji su procurili s Facebook-a, tako da ima puno
            neobičnih imena i možda čak neki duplikata, ali pokušao
            sam ih svesti na minimum.
          </p>
          <div className="divider"></div>
          <h2 className="text-3xl font-bold">Način bodovanja</h2>
          <p className="py-6 bg-base-300 rounded-box p-6">
            Sva imena prilikom inicijalnog unosa u bazu su dobili ocjenu 100.
            Aplikacija odabira dva imena istog spola nasumično, nakon čega
            korisnik odabire koje mu je ljepše.<br />
            Tada se primjenjuje <a className="link"
              href="https://medium.com/purple-theory/what-is-elo-rating-c4eb7a9061e0"
              target="_blank" rel="noreferrer">
              Elo sistem bodovanja
            </a>.
            To je princip koji se koristi prilikom bodovanja šahista. U osnovi,
            ako neko slabije rangirano ime pobjedi jedno od bolje
            rangiranih imena, više će bodova prvo ime
            dobiti te drugo ime izgubiti.
          </p>
          <div className="divider"></div>
          <h2 className="text-3xl font-bold">Tehnologije</h2>
          <div className="py-6 bg-base-300 rounded-box p-6">
            <a className="link" href="https://nextjs.org/"
              target="_blank" rel="noreferrer">Next.js</a><br />
            <a className="link" href="https://www.typescriptlang.org/"
              target="_blank" rel="noreferrer">Typescript</a><br />
            <a className="link" href="https://tailwindcss.com/"
              target="_blank" rel="noreferrer">TailwindCss</a><br />
            <a className="link" href="https://github.com/axios/axios"
              target="_blank" rel="noreferrer">Axios</a><br />
            <p>MySql</p>
          </div>
          <p>Inspiracija: <a className="link" href="https://github.com/TheoBr/roundest-mon" target="_blank" rel="noreferrer">
            TheoBr
          </a></p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
