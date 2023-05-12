import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="Loader">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="196"
        visible={true}
      />
    </div>
  );
}
