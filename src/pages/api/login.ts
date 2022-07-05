import { initAuth } from '@lib/firebase';
import { NextApiRequest, NextApiResponse } from 'next';
import { setAuthCookies } from 'next-firebase-auth';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      await setAuthCookies(req, res);
   } catch (e) {
      // eslint-disable-next-line no-console
      return res.status(500).json({ e });
   }
   return res.status(200).json({ status: true });
};

export default handler;
