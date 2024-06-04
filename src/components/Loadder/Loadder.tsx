import React, { FC } from 'react';
import './Loadder.scss';
import { Audio, ColorRing } from 'react-loader-spinner'
import { render } from 'react-dom';

interface LoaderProps { }

const Loader: FC<LoaderProps> = () => {
  return <ColorRing
    visible={true}
    height="200"
    width="200"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
};
export default Loader;
