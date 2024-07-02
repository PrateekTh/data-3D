import * as React from 'react';
import InstancedPoints from './InstancedPoints';

const DataPointsModel = ({ data }) => {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <InstancedPoints
        data={data}
        // layout={layout}
        // selectedPoint={selectedPoint}
        // onSelectPoint={onSelectPoint}
      />
    </>
  );
};

export default DataPointsModel;