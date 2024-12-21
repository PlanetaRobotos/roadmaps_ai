import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60, // 1 hour
        sameSite: 'strict',
        path: '/'
      })
    );

    return res.status(200).json({ message: 'Token set successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
