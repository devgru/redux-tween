import React from 'react';
import './App.css';

import FillParentSvg from './components/fill-parent-svg';
import Demo from './components/demo';

export default () => {
  return (
    <FillParentSvg>
      <Demo />
    </FillParentSvg>
  );
};
