import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../api"
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import ProtectedRoute from './ProtectedRoute'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    getUsername();
  });

  const getUsername = () => {
    api.
      get("api/get-username/")
      .then((res)  => res.data)
      .then((data) => {
        setUsername(data[0].username); 
      })
      .catch((error) => alert(error))
  }
  

  return (
    <header className="bg-cyan-300">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to='/' className="-m-1.5 p-1.5">
            <span className="sr-only">Note Book</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to='/' className="text-sm/6 font-semibold text-gray-900">Home</Link>
          <Link to='/contact' className="text-sm/6 font-semibold text-gray-900">Contact</Link>
          <Link to='/about' className="text-sm/6 font-semibold text-gray-900">About</Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <p className='right-10 px-3'>{username}</p>
        <Link to='/logout' className="text-sm/6 font-semibold text-gray-900">
          Log out <span aria-hidden="true">&#8634;</span>
        </Link>
          

        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-cyan-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Note Book</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <Link to='/' className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</Link>
              <Link to='/contact' className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Contact</Link>
              <Link to='/about' className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">About</Link>
                
              </div>
              <div className="py-6">
                <Link to='/logout' className="text-sm/6 font-semibold text-gray-900">
                  Log out <span aria-hidden="true">&#8634;</span>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
export default Navbar