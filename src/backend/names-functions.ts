import { names } from '@prisma/client';
import { prisma } from './prisma';

export const getRandomNames = async () => {
  const maleOrFemale = Math.floor(Math.random() * 2) == 0? 'male': 'female';
  const minMax = await prisma.names.aggregate({
    _min: {id: true},
    _max: {id: true},
    where: { gender: maleOrFemale }
  });
  const generate = () => Math.floor(Math.random() * ((minMax._max.id || 1)-(minMax._min.id || 1))) + (minMax._min.id || 1)-1;
  const ids = [generate(), generate(), generate()]
  const names = await getNamesFromIds(ids);
  return {
    firstName: names[0],
    secondName: names[1]
  };
}

export const getNamesFromIds = async (ids: number[]) => {
  return await prisma.names.findMany({
    where: { id: {in: ids } }
  });
}

export const updateRating = async (name: names) => {
  await prisma.names.update({where: {id: name.id}, data: {rating: name.rating}});
}