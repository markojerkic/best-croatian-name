import type { NextPage } from 'next'
import { useState } from 'react';

type NameSelection = {
  firstName: string;
  secondName: string;
}

const names = [
  'Marko',
  'Ivan',
  'Karlo',
  'Luka'
]

const NameChoice: React.FC<{name: string; onClick: () => void}> = ({name, onClick}) => {
  return (
    <div className="w-64 h-64 flex justify-center items-center 
      hover:bg-red-500 bg-red-300 hover:cursor-pointer rounded-md
      font-bold"
      onClick={() => onClick()}>{name}</div>
  );
}

const randomNames = () => {
  const firstName =  names[Math.floor(Math.random()*names.length)];
  const secondName = names[Math.floor(Math.random()*names.length)];
  return {firstName: firstName, secondName: secondName};
}

const Home: NextPage = () => {
  const [names, setNames] = useState<NameSelection>(randomNames())
  return (
   <div className="w-full h-screen space-x-4 flex justify-center items-center">
     <NameChoice name={names.firstName} onClick={() => setNames(randomNames())} />
     <div>ili</div>
     <NameChoice name={names.secondName} onClick={() => setNames(randomNames())} />
   </div>
  )
}

export default Home
