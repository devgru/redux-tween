import React from 'react';

export default ({children}) => {
  return (
    <div>
      <a href="/circle">Circle</a><br />
      <a href="/counter">Counter</a><br />
      
      {children}
    </div>
  );
};
