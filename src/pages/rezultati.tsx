import { names } from '@prisma/client';
import axios from "axios";
import { GetStaticProps, NextPage } from "next";

const NamesPanel: React.FC<{gender: 'male' | 'female', names: names[]}> = ({gender, names}) => {
  return (
    <div className="w-96 mx-auto my-4 space-y-4">
      <p className="font-bold text-xl text-center">{gender === 'male'? 'Muška': 'Ženska'} imena</p>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Ime</th>
            <th>Ocjena</th>
          </tr>
        </thead>
        <tbody>
        {names.map((name, index) => (<tr key={name.id}>
          <td>{index+1}</td>
          <td>{name.name}</td>
          <td>{name.rating}</td>
        </tr>))}
        </tbody>
      </table>
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
