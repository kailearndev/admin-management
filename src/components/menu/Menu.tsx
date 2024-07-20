// import React from 'react';
import { menu } from './data';
import MenuItem from './MenuItem';

const Menu = () => {
  return (
    <div className="2xl:w-[200px] lg:w-[160px] fixed">
      <div className="w-full flex flex-col gap-5">
        {menu.map((item, index) => (
          <MenuItem
            key={index}

            listItems={item.listItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
