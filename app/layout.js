
import '../app/global.scss'
import { Roboto, Bodoni_Moda } from 'next/font/google'

const roboto = Roboto({
  weight:[ "500"],
  subsets: ['latin']
})
const bodoni_moda = Bodoni_Moda({
  style: ['normal', 'italic'],
  weight: ["400", "900"],
  subsets: ['latin']
})
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${bodoni_moda.variable}`}>
      <body>{children}</body>
    </html>
  )
}