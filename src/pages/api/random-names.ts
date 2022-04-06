import {getRandomNames} from '../../backend/names-functions';
import NameSelection from '../../types/name-selection';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse<NameSelection>} res Returns two random names of
 * same gender
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NameSelection>
) {
  const names = await getRandomNames();
  res.status(200).json(names);
}
