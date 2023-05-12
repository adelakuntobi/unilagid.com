import React from 'react';
import Logo from './Logo';

const TopNav = () => {
  return (
    <nav className=' py-3 border-b border-[#EAECF0] ' >
      <section className='max-w-7xl mx-auto items-center justify-between'>
        <Logo />
        <div className='items-center gap-3'>
          <div>
            <h2 className='font-semibold'>Aderonke Adeniran</h2>
            <p className='text-sm text-right'>160408882</p>
          </div>
          <img src="/img/student3.png" className='w-10 h-10 rounded-full' alt="" />
        </div>
      </section>
    </nav>
  );
};

export default TopNav;