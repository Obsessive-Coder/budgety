import React from 'react';
import Image from 'next/image';
import loader from '@/public/spinner.gif'

const Spinner = () => {
  return (
    <div className='d-flex align-items-center justify-content-center'>
        <Image src={loader} alt="loading" />
    </div>
  )
};

export default Spinner;