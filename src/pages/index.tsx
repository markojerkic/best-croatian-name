import NameSelection from '@/types/name-selection';
import { names, names_gender } from '@prisma/client';
import axios from 'axios';
import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useState } from 'react';

const NameChoice: React.FC<{name: string, gender: names_gender, click: () => void}> = ({name, gender, click}) => {
  const maleOfFemale = gender === 'male'? 'hover:bg-blue-500 bg-blue-300': 'hover:bg-red-500 bg-red-300';
  const className = `w-64 h-64 flex justify-center items-center 
    hover:cursor-pointer rounded-md
    font-bold ${maleOfFemale}`;
  return (
    <button className={"btn btn-lg " + className}
      onClick={() => click()}
      >{name}</button>
  );
}

const castVote = async (voteFor: number, voteAgainst: number, setNames: Dispatch<SetStateAction<NameSelection>>) => {
  setNames(await axios.post<NameSelection>('/api/vote-names', {voteFor, voteAgainst}).then((res) => res.data));
}

const Home: NextPage<{nameSelection: NameSelection}> = ({nameSelection}) => {
  const [{firstName, secondName}, setNames] = useState<NameSelection>(nameSelection)
  return (
   <div className="w-full h-screen space-x-4 flex justify-center items-center">
     <NameChoice name={firstName.name} gender={firstName.gender}
     click={() => castVote(firstName.id, secondName.id, setNames)} 
     />
     <div>ili</div>
     <NameChoice name={secondName.name} gender={secondName.gender}
     click={() => castVote(secondName.id, firstName.id, setNames)} 
     />
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
