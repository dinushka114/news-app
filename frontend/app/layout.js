import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from './providers'
import Navbar from './components/nav/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50"}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}