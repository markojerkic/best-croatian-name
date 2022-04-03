import NameSelection from "@/types/name-selection";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../backend/prisma';

const getRandomNames = async () => {
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
    firstName: names[0],
    secondName: names[1]
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameSelection>
) {
  const names = await getRandomNames();
  res.status(200).json(names);
}
