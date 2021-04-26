import React from 'react';
import './Formations.scss';
import ContributorTable from './ContributorTable';

const Formations = () => (
  <div className="formations">
    <h2 className="formations__title">Business Intelligency - Formation</h2>
    <h3 className="formations__subtitle">Contributeurs (créateurs et formateurs) :</h3>
    <ContributorTable />
  </div>
);

export default Formations;
