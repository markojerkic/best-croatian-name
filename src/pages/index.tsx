import NameSelection from '@/types/name-selection';
import {names_gender} from '@prisma/client';
import axios from 'axios';
import type {NextPage} from 'next';
import Image from 'next/image';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {getRandomNames} from '../backend/names-functions';

const NameChoice: React.FC<{name: string, loading: boolean,
  gender: names_gender, click: () => void}> =
  ({name, gender, loading, click}) => {
    const maleOfFemale = gender === 'male'? 'hover:bg-blue-600 bg-blue-400':
      'hover:bg-red-700 bg-red-500';
    const className = `w-64 h-64 flex justify-center items-center 
    hover:cursor-pointer rounded-lg text-white
    font-bold ${maleOfFemale}`;
    if (loading) {
      return <Image className={maleOfFemale} src="/loading-rings.svg"
        width={256} height={256} alt="Učitavanje..." />;
    }
    return (
      <button className={'btn btn-lg ' + className}
        onClick={() => click()}>{name}</button>
    );
  };

const castVote = async (voteFor: number, voteAgainst: number,
    setNames: Dispatch<SetStateAction<NameSelection>>,
    setLoading: Dispatch<SetStateAction<boolean>>) => {
  setLoading(true);
  setNames(await axios.post<NameSelection>('/api/vote-names',
      {voteFor, voteAgainst}).then((res) => {
    setLoading(false);
    return res.data;
  }));
};

const Home: NextPage<{nameSelection: NameSelection}> =
  ({nameSelection}) => {
    const [{firstName, secondName}, setNames] =
      useState<NameSelection>(nameSelection);
    const [loading, setLoading] = useState<boolean>(false);

    return (
      <div className="w-full h-screen flex flex-col justify-center space-y-6">
        <h2 className="text-center text-3xl font-bold italic">
          Koje ime vam je ljepše?
        </h2>
        <div className="md:space-x-4 flex flex-col lg:flex-row
          justify-center items-center">
          <NameChoice name={firstName.name} gender={firstName.gender}
            loading={loading}
            click={() => castVote(firstName.id,
                secondName.id, setNames, setLoading)}
          />
          <div className="my-4">ili</div>
          <NameChoice name={secondName.name} gender={secondName.gender}
            loading={loading}
            click={() => castVote(secondName.id,
                firstName.id, setNames, setLoading)}
          />
        </div>
      </div>
    );
  };

export const getServerSideProps = async () => {
  const nameSelection = await getRandomNames();

  return {
    props: {
      nameSelection,
    },
  };
};

export default Home;
