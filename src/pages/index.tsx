import { names } from '@prisma/client';
import type { NextPage } from 'next'
import { useState } from 'react';
import { prisma } from '../backend/index';

type NameSelection = {
  firstName: names;
  secondName: names;
}

const namesExampels = [
  'Marko',
  'Ivan',
  'Karlo',
  'Luka'
]

const NameChoice: React.FC<{name: string}> = ({name}) => {
  return (
    <div className="w-64 h-64 flex justify-center items-center 
      hover:bg-red-500 bg-red-300 hover:cursor-pointer rounded-md
      font-bold"
      // onClick={() => onClick()}
      >{name}</div>
  );
}

const randomNames = () => {
  const firstName =  namesExampels[Math.floor(Math.random()*namesExampels.length)];
  const secondName = namesExampels[Math.floor(Math.random()*namesExampels.length)];
  return {firstName: firstName, secondName: secondName};
}

const Home: NextPage<{nameSelection: NameSelection}> = ({nameSelection}) => {
  const [{firstName, secondName}, setNames] = useState<NameSelection>(nameSelection)
  return (
   <div className="w-full h-screen space-x-4 flex justify-center items-center">
     <NameChoice name={firstName.name} 
    //  onClick={() => setNames(randomNames())} 
     />
     <div>ili</div>
     <NameChoice name={secondName.name} 
    //  onClick={() => setNames(randomNames())} 
     />
   </div>
  )
}

export const getServerSideProps = async () => {
  const maleOrFemale = Math.floor(Math.random() * 2) == 0? 'male': 'female';
  const minMax = await prisma.names.aggregate({
    _min: {id: true},
    _max: {id: true},
    where: { gender: maleOrFemale }
  });
  const generate = () => Math.floor(Math.random() * ((minMax._max.id || 1)-(minMax._min.id || 1))) + (minMax._min.id || 1)-1;
  const ids = [generate(), generate(), generate()]
  const names = await prisma.names.findMany({
    where: { id: {in: ids } }
  });
  return {
    props: {
      nameSelection: {
        firstName: names[0],
        secondName: names[1]
      }
    }
  }
}

export default Home;
