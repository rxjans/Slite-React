import React from 'react';
import music from '../assets/music.png';

const Nav = () => {
  return (
    <nav>
        <div className='absolute w-full '>
            <div className='flex h-[62px] bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 justify-center items-center'>
                <div>
                    <img className=' h-[42px]' src={music} />
                </div>
                <div className=''>
                    <h2 className='font-semibold text-xl tracking-tight shadow-xl'>SLITE.IO</h2>
                </div>
            </div>
            
        </div>
    </nav>
  )}

export default Nav;
