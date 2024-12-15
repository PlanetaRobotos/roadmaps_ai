import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Mailgun from 'next-auth/providers/mailgun';

export default {
  providers: [
    Mailgun({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
      // sendVerificationRequest
    }),
    Google
    /*CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com'
        }
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'John Doe',
          email: credentials?.email as string
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })*/
  ],
  pages: {
    signIn: '/signin', //sigin page
    verifyRequest: '/auth/verify-request', // Verification message page
    error: '/auth/error' // Error page
  },
  callbacks: {
    async session({ session, token, user }) {
      // You can pass additional data to the session here
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account != null && account.provider === 'google') {
        if (profile != undefined) {
          if (profile.email_verified === true) {
            console.log('Email verified');
            return true;
          }
        }
      }
      return true;
    }
  },
  // Optional: Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig;
