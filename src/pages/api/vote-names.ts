import newScore from '../../backend/elo-rating';
import {getNamesFromIds, getRandomNames,
  updateRating} from '../../backend/names-functions';
import NameSelection from '../../types/name-selection';
import Vote from '../../types/vote';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 *
 * @param {NextApiRequest} req Requst object instace,
   must contain body of type {@link Vote}
 * @param {NextApiResponse<NameSelection>} res Return object
  of type {@link NameSelection}
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NameSelection>
) {
  if (req.method !== 'POST' ) {
    return res.status(405);
  }
  const vote: Vote = req.body;
  const votedNames = await getNamesFromIds([vote.voteFor, vote.voteAgainst]);
  if (votedNames.map((name) => name.gender).filter((value, index, self) => {
    return self.indexOf(value) === index;
  }).length > 1) {
    // return res.status(400).json
    // ({message: "Two names are of opposite gender"});
  }

  const votedForName = votedNames.filter((name) => name.id === vote.voteFor)[0];
  const votedAgainsName = votedNames.filter((name) =>
    name.id === vote.voteAgainst)[0];

  const newForRating = newScore(votedForName.rating!,
    votedAgainsName.rating!, 1);
  const newAgainsRating = newScore(votedAgainsName.rating!,
    votedForName.rating!, 0);

  votedForName.rating = newForRating;
  votedAgainsName.rating = newAgainsRating;
  Promise.all([
    updateRating(votedForName),
    updateRating(votedAgainsName),
  ]);

  res.status(200).json(await getRandomNames());
}
