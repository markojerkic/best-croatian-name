import {names} from '@prisma/client';
import {GetStaticProps, NextPage} from 'next';
import {Dispatch, SetStateAction, useState} from 'react';
import {getSortedNames} from '../backend/names-functions';
import React from 'react';

const NamesPanel: React.FC<{gender: 'male' | 'female', names: names[]}> =
  ({gender, names}) => {
    const [filteredNames, setFilteredNames] = useState<names[]>(names);

    const filterNames = (value: string) => {
      setFilteredNames(names.filter((name) => name.name.toLowerCase()
          .includes(value.toLowerCase())));
    };

    return (
      <div className="w-96 mx-auto my-4 space-y-4">
        <p className="font-bold text-xl text-center">{gender === 'male'?
          'Muška': 'Ženska'} imena</p>
        <input type="text" placeholder="Pretraga imena"
          className="input input-bordered w-full"
          onChange={(event) => filterNames(event.target.value)}></input>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Ime</th>
              <th>Ocjena</th>
            </tr>
          </thead>
          <tbody>
            {filteredNames.map((name, index) => (<tr key={name.id}>
              <td>{index+1}</td>
              <td>{name.name}</td>
              <td>{name.rating}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    );
  };

const GenderSelector: React.FC<{isMaleSelected: boolean,
  setIsMaleSelected: Dispatch<SetStateAction<boolean>>}> =
({isMaleSelected, setIsMaleSelected}) => {
  return (
    <div className="tabs">
      <a className={'tab tab-lg tab-lifted' + (isMaleSelected && ' tab-active')}
        onClick={() => setIsMaleSelected(true)} >Muška imena</a>
      <a className={'tab tab-lg tab-lifted' + (!isMaleSelected &&
        ' tab-active')}
      onClick={() => setIsMaleSelected(false)} >Ženska imena</a>
    </div>
  );
};

const ResultsPage: NextPage<{maleNames: names[], femaleNames: names[]}> =
  ({maleNames, femaleNames}) => {
    const [isMaleSelected, setIsMaleSelected] = useState<boolean>(true);
    return (
      <div className="flex flex-col justify-center space-y-4">
        <div className="lg:hidden mx-auto">
          <GenderSelector isMaleSelected={isMaleSelected}
            setIsMaleSelected={setIsMaleSelected} />
        </div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className={isMaleSelected? '': 'hidden lg:block'}>
            <NamesPanel gender="male" names={maleNames} />
          </div>
          <div className={!isMaleSelected? '': 'hidden lg:block'}>
            <NamesPanel gender="female" names={femaleNames} />
          </div>
        </div>
      </div>
    );
  };

export const getStaticProps: GetStaticProps = async () => {
  const [maleNames, femaleNames] = await Promise.all([
    getSortedNames('male'),
    getSortedNames('female'),
  ]);

  const REVALIDATE = 60 * 5;
  return {props: {maleNames, femaleNames}, revalidate: REVALIDATE};
};

export default ResultsPage;
