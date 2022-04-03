import { names, names_gender } from '@prisma/client';
import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';

type NameSelection = {
  firstName: names;
  secondName: names;
}

const NameChoice: React.FC<{name: string, gender: names_gender}> = ({name, gender}) => {
  const maleOfFemale = gender === 'male'? 'hover:bg-blue-500 bg-blue-300': 'hover:bg-red-500 bg-red-300';
  const className = `w-64 h-64 flex justify-center items-center 
    hover:cursor-pointer rounded-md
    font-bold ${maleOfFemale}`;
  return (
    <div className={className}
      // onClick={() => onClick()}
      >{name}</div>
  );
}

const Home: NextPage<{nameSelection: NameSelection}> = ({nameSelection}) => {
  const [{firstName, secondName}, setNames] = useState<NameSelection>(nameSelection)
  return (
   <div className="w-full h-screen space-x-4 flex justify-center items-center">
     <NameChoice name={firstName.name} gender={firstName.gender}
    //  onClick={() => setNames(randomNames())} 
     />
     <div>ili</div>
     <NameChoice name={secondName.name} gender={secondName.gender}
    //  onClick={() => setNames(randomNames())} 
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
