import NameSelection from '@/types/name-selection';
import {names_gender} from '@prisma/client';
import axios from 'axios';
import type {NextPage} from 'next';
import Image from 'next/image';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

const NameChoice: React.FC<{name: string | undefined,
  defaultGender: 'male' | 'female',
  gender: names_gender | undefined,
  click: () => void}> =
  ({name, gender, defaultGender, click}) => {
    const maleOfFemale = gender === 'male' ||
    (!gender && defaultGender === 'male')? 'hover:bg-blue-600 bg-blue-400':
      'hover:bg-red-700 bg-red-500';
    const className = `w-64 h-64 flex justify-center items-center 
    hover:cursor-pointer rounded-lg text-white
    font-bold ${maleOfFemale}`;
    if (!name) {
      return <Image className={maleOfFemale} src="/loading-rings.svg"
        width={256} height={256} alt="Učitavanje..." />;
    }
    return (
      <button className={'btn btn-lg ' + className}
        onClick={() => click()}>{name}</button>
    );
  };

const castVote = async (voteFor: number | undefined,
    voteAgainst: number | undefined,
    setNames: Dispatch<SetStateAction<NameSelection | undefined>>) => {
  setNames(undefined);
  if (!voteFor || !voteAgainst) {
    return;
  }
  setNames(await axios.post<NameSelection>('/api/vote-names',
      {voteFor, voteAgainst}).then((res) => res.data));
};

const getFirstRandomNames = async (setNames:
  Dispatch<SetStateAction<NameSelection | undefined>>) => {
  setNames(await axios.get<NameSelection>('/api/random-names')
      .then((res) => res.data));
};

const Home: NextPage = () => {
  const [names, setNames] =
      useState<NameSelection | undefined>();

  useEffect(() => {
    getFirstRandomNames(setNames);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center space-y-6">
      <h2 className="text-center text-3xl font-bold italic">
          Koje ime vam je ljepše?
      </h2>
      <div className="space-x-4 flex flex-col lg:flex-row
          justify-center items-center">
        <div>
          <NameChoice name={names?.firstName.name}
            gender={names?.firstName.gender}
            defaultGender="male"
            click={() => castVote(names?.firstName.id,
                names?.secondName.id, setNames)}
          />
        </div>
        <div className="my-4">ili</div>
        <div>
          <NameChoice name={names?.secondName.name}
            gender={names?.secondName.gender}
            defaultGender="female"
            click={() => castVote(names?.secondName.id,
                names?.firstName.id, setNames)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
