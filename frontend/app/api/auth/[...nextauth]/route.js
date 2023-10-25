import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { API } from '../../../../constants';

export const authOptions = {
    pages: {
        signIn: "/auth/user/login",
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hello@example.com'
                },
                password: { label: 'Password', type: 'password' },

            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                if (credentials.role == "User") {
                    const response = await fetch(`${API}/api/auth/user-login`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    })

                    const result = await response.json();

                    if (!result._id) {
                        return null
                    }

                    if (response.status != 200) {
                        return null;
                    }

                    return {
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        role: "User",
                        randomKey: 'Hey cool'
                    }
                } else if (credentials.role == "Admin") {
                    const response = await fetch(`${API}/api/auth/admin-login`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    })

                    const result = await response.json();

                    if (!result._id) {
                        return null
                    }

                    if (response.status != 200) {
                        return null;
                    }

                    return {
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        role: "Admin",
                        randomKey: 'Hey cool'
                    }
                }



            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                    role:token.role
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                    role:u.role
                }
            }
            return token
        }
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }