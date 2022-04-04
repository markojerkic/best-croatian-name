import { names } from '@prisma/client';
import { prisma } from './prisma';

const FIST_MALE_id = 501;
const LAST_MALE_ID = 1000;

export const getRandomNames = async () => {
  const maleOrFemale = Math.floor(Math.random() * 2) == 0? 'male': 'female';
  const minMax = (maleOrFemale === 'male')? {min: FIST_MALE_id, max: +LAST_MALE_ID}:
  {min: 1, max: FIST_MALE_id -1}
  console.log(minMax);
  const generate = () => Math.floor(Math.random() * (minMax.max-minMax.min)) + minMax.min-1;
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

export const getSortedNames = async (gender: 'male' | 'female') => {
  return await prisma.names.findMany({where: {gender: gender}, orderBy: {rating: 'desc'}});
}
