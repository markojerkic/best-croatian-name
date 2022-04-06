import {getSortedNames} from '../../backend/names-functions';
import {names} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse<{maleNames: names[], femaleNames: names[]}>} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{maleNames: names[], femaleNames: names[]}>
) {
  const [maleNames, femaleNames] = await Promise.all([
    getSortedNames('male'),
    getSortedNames('female'),
  ]);

  res.status(200).json({maleNames, femaleNames});
}
