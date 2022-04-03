import file from "./formated_names-1000.json";
import {prisma} from "../src/backend/prisma";
import { names_gender } from "@prisma/client";

const namesExists: { name: string; gender: "female" | "male"}[] = [];

const fillFirst200 = async () => {
  let id = 1;
  let filtered = file.map((name) => ({name: name.name, gender: name.gender === 'male'? names_gender.male: names_gender.female, 
  rating: 100}));
  filtered = filtered.filter((name) => {
    if (namesExists.includes({name: name.name, gender: name.gender})) {
      return false;
    }
    namesExists.push({name: name.name, gender: name.gender});
    return true;
  }).map((name) => ({...name, id: id++}));

  const creation = await prisma.names.createMany({data: filtered});
  console.log(creation);
}

fillFirst200();