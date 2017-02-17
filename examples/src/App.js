import React from 'react';
import './App.css';

export default ({children}) => {
  return (
    <div>
      <a href="/circle">Circle</a>
      <a href="/counter">Counter</a>
      
      {children}
    </div>
  );
};
