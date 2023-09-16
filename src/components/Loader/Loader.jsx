import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { LoaderCont } from './Loader.styled';

const Loader = () => (
  <LoaderCont>
    <InfinitySpin />
  </LoaderCont>
);

export default Loader;
