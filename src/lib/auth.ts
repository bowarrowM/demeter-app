import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // if no entry, reject login
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // look for the user's mail in the DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        // reject if no password was provided
        if (!user || !user.password) {
          return null;
        }
        // validate password : compare the hashed pass with bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // if incorrect, reject
        if (!isPasswordValid) {
          return null;
        }
        // if id returns as user.id, mail as user.mail, name as user.name
        // allow login
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  // stateless session. user sess shouldnt really need to expire so JWT
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
