import { getRandomNames } from "../../backend/names-functions";
import NameSelection from "../../types/name-selection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameSelection>
) {
  const names = await getRandomNames();
  res.status(200).json(names);
}
