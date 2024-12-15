import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { prisma } from '@/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig
});
