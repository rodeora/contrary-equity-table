import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo-white.png'

export default function Header() {
  return (
    <header className="bg-blue-700 shadow">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-24 w-full items-center justify-between border-b border-blue-800">
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="Contrary Logo" className="h-8 w-auto" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
