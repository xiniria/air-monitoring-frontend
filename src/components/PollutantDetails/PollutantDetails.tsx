import React from 'react';
import { useParams } from 'react-router-dom';

function PollutantDetails(): JSX.Element {
  const { pollutantId } = useParams<{ pollutantId: string }>();

  return <div>Pollutant details for pollutant {pollutantId}</div>;
}

export default PollutantDetails;
