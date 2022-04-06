import {names} from '@prisma/client';

type NameSelection = {
  firstName: names;
  secondName: names;
}

export default NameSelection;
