import React from 'react';
import { DiReact } from 'react-icons/di';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import ChangeThemes from './ChangesThemes';
import MenuItem from './menu/MenuItem';
import { menu } from './menu/data';

const Navbar = () => {

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);


  const navigate = useNavigate();



  return (
    // navbar screen
    <div className="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
      {/* container */}
      <div className="flex gap-3 items-center">
        {/* for mobile */}
        <div className="drawer w-auto p-0 mr-1 xl:hidden">
          <input
            id="drawer-navbar-mobile"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <div className="p-0 w-auto drawer-content">
            <label
              htmlFor="drawer-navbar-mobile"
              className="p-0 btn btn-ghost drawer-button"
            >
              <HiBars3CenterLeft className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side z-[99]">
            <label
              htmlFor="drawer-navbar-mobile"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
              <Link
                to={'/'}
                className="flex items-center gap-1 xl:gap-2 mt-1 mb-5"
              >
                <DiReact className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary animate-spin-slow" />
                <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
                  React Dashboard
                </span>
              </Link>
              {menu.map((item, index) => (
                <MenuItem
                  onClick={toggleDrawer}
                  key={index}

                  listItems={item.listItems}
                />
              ))}
            </div>
          </div>
        </div>

        {/* navbar logo */}
        <Link to={'/'} className="flex items-center gap-1 xl:gap-2">
          <DiReact className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary animate-spin-slow" />
          <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
            Admin
          </span>
        </Link>
      </div>

      {/* navbar items to right */}
      <div className="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
        {/* search */}




        {/* notification */}


        {/* theme */}
        <div className="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
          <ChangeThemes />
        </div>

        {/* avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div
            onClick={() => {
              navigate('/login')
              localStorage.removeItem('token')
            }}
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar"
          >



            Logout

          </div>
        </div>

      </div>
    </div>

  );
};

export default Navbar;
