import React from 'react';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import PageTitle from 'components/PageTitle/PageTitle';
import ChartAndButtons from './ChartAndButtons';

function HistoryAndPrevisions(): JSX.Element {
  return (
    <div>
      <AddressAutocomplete />
      <PageTitle title="Historique et Prévisions" />
      <ChartAndButtons />
    </div>
  );
}

export default HistoryAndPrevisions;
