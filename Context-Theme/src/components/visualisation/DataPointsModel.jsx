import * as React from 'react';
import InstancedPoints from './InstancedPoints';

const DataPointsModel = () => {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.8} />
      <InstancedPoints />
    </>
  );
};

export default DataPointsModel;