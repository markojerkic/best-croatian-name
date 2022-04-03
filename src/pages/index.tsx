import NameSelection from '@/types/name-selection';
import { names, names_gender } from '@prisma/client';
import axios from 'axios';
import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useState } from 'react';

const NameChoice: React.FC<{name: string, gender: names_gender, click: () => void}> = ({name, gender, click}) => {
  const maleOfFemale = gender === 'male'? 'hover:bg-blue-600 bg-blue-400': 'hover:bg-red-700 bg-red-500';
  const className = `w-64 h-64 flex justify-center items-center 
    hover:cursor-pointer rounded-lg text-white
    font-bold ${maleOfFemale}`;
  return (
    <button className={"btn btn-lg " + className}
      onClick={() => click()}>{name}</button>
  );
}

const castVote = async (voteFor: number, voteAgainst: number, setNames: Dispatch<SetStateAction<NameSelection>>) => {
  setNames(await axios.post<NameSelection>('/api/vote-names', {voteFor, voteAgainst}).then((res) => res.data));
}

const Home: NextPage<{nameSelection: NameSelection}> = ({nameSelection}) => {
  const [{firstName, secondName}, setNames] = useState<NameSelection>(nameSelection)
  return (
    <div className="w-full h-screen flex flex-col justify-center space-y-6">
      <h2 className="text-center text-3xl font-bold italic">Koje ime vam je ljepše?</h2>
      <div className="md:space-x-4 flex flex-col lg:flex-row justify-center items-center">
        <NameChoice name={firstName.name} gender={firstName.gender}
          click={() => castVote(firstName.id, secondName.id, setNames)} 
        />
        <div className="my-4">ili</div>
        <NameChoice name={secondName.name} gender={secondName.gender}
          click={() => castVote(secondName.id, firstName.id, setNames)} 
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  
  const nameSelection = await axios.get<NameSelection>('http://localhost:3000/api/random-names')
    .then(response => response.data);

  return {
    props: {
      nameSelection
    }
  }
}

export default Home;
