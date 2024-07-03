import * as React from 'react';
import InstancedPoints from './InstancedPoints';

const DataPointsModel = ({ data }) => {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.3} />
      <InstancedPoints data={data} />
    </>
  );
};

export default DataPointsModel;