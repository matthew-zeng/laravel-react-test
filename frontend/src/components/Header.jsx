import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getUser, logout } from 'app/reducers/userSlice';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-blue-100 text-white px-4 md:px-2 py-2.5 sm:px-4">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
      <Link to="/" className='flex items-center'>
        <h4 className='text-white text-3xl font-bold'>News</h4>
      </Link>
      <div className='block w-auto'>
        <ul className='flex rounded-lg md:p-4 md:mt-0 flex-row md:space-x-8 md:text-sm md:font-medium'>
          <li className='flex items-center'>
            <Link to="/" className="block rounded py-2 pr-4 pl-3 text-white">Home</Link>
          </li>
          {user ? (
            // <li>
            //   <button onClick={handleLogout} className="block rounded py-2 pr-4 pl-3 text-white">Logout</button>
            // </li>
            <ProfileDropdown user={user} logout={handleLogout}/>
          ) : (
            <>
              <li>
                <Link to="/login" className="block rounded py-2 pr-4 pl-3 text-white">Login</Link>
              </li>
              <li>
                <Link to="/register" className="block rounded py-2 pr-4 pl-3 text-white">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
  )
}
