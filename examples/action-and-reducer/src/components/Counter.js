import React from 'react';

import roundTo from 'round-to-precision';
const cents = roundTo(0.01);

export default ({count, increment, decrement}) => <div>
  <button onClick={increment}>+</button>
  {cents(count)}
  <button onClick={decrement}>-</button>
</div>;
