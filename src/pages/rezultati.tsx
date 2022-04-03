import { names } from '@prisma/client';
import axios from "axios";
import { GetStaticProps, NextPage } from "next";

const NameResult: React.FC<{name: names}> = ({name}) => {
  return (
    <div className="flex justify-between"><span className="capitalize">{name.name}</span><span>{name.rating}</span></div>
  );
}

const NamesPanel: React.FC<{gender: 'male' | 'female', names: names[]}> = ({gender, names}) => {
  return (
    <div className="w-96 mx-auto my-4">
      <p>{gender === 'male'? 'Muška': 'Ženska'} imena</p>
      <hr />
      {names.map((name) => (<NameResult key={name.id} name={name}></NameResult>))}
    </div>
  )
}

const ResultsPage: NextPage<{maleNames: names[], femaleNames: names[]}> = ({maleNames, femaleNames}) => {
  return (
    <div className="flex justify-around">
      <NamesPanel gender="male" names={maleNames} />
      <NamesPanel gender="female" names={femaleNames} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const names = await axios.get<{maleNames: names[], femaleNames: names[]}>
    ('http://localhost:3000/api/sorted-names').then((res) => res.data);

  const REVALIDATE = 60 * 5;
  return {props: names, revalidate: REVALIDATE}
}

export default ResultsPage;
