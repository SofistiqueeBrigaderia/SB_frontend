import BarMenu from 'components/BarMenu';
import React from 'react';
import './style.css';

const Payment = () => {
  return (
    <>
      <BarMenu bgColor="#fff" home={false} />
      <main className="cartContainer"></main>
    </>
  );
};

export default Payment;
