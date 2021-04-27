import React, { useEffect, useState } from 'react';
import './ContributorTable.scss';
import { fetchFormations } from '../API';

const ContributorTable = () => {
  const [formations, changeFormation] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const setFormations = async () => {
      setHasError(false);
      try {
        const formationsElement = await fetchFormations();
        changeFormation(formationsElement);
      } catch (e) {
        setHasError(true);
      }
    };
    setFormations();
  }, []);
  
  console.log('********');
  if (formations.length !== 0) {
    // console.log(formations[0].name);
    formations.map((formation) => console.log(formation.name));
  }
  console.log('********');


  const renderLoadingError = () => (
    <section>
      <h1>Le serveur Planbot a rencontré une erreur.</h1>
      <h2>Veuillez réactualiser la page.</h2>
    </section>
  );

  if (hasError) {
    return renderLoadingError();
  }
  return (
    <div>
      <table className="contributor-table">
        <thead>
          <tr>
            <th> </th>
            <th className="contributor-table__contributor-section"> </th>
            <th className="contributor-table__time-section" colSpan="8">Temps investit</th>
          </tr>
          <tr>
            <th>Formations</th>
            <th className="contributor-table__contributor-section">Contributeurs (de l&apos;année)</th>
            <th colSpan="2" className="contributor-table__time-section">Année courante</th>
            <th colSpan="2" className="contributor-table__time-section">2020</th>
            <th colSpan="2" className="contributor-table__time-section">2019</th>
            <th colSpan="2" className="contributor-table__time-section">Total (depuis création)</th>
          </tr>
          <tr>
            <th> </th>
            <th className="contributor-table__contributor-section"> </th>
            <th className="contributor-table__time-section">Création</th>
            <th>Formation</th>
            <th className="contributor-table__time-section">Création</th>
            <th>Formation</th>
            <th className="contributor-table__time-section">Création</th>
            <th>Formation</th>
            <th className="contributor-table__time-section">Création</th>
            <th>Formation</th>
          </tr>
        </thead>
        <tbody>
          {formations.length !== 0 && formations.map((formation) => (
            <tr>
              <td key={formation.id} className="ExcellenceCenterTable__row-item">{formation.name}</td>
            </tr>
          ))}
          <tr>
            <td>Git partie 1</td>
            <td className="contributor-table__contributors-name">
              Teddy - Alban - Pierre - Julie - Teddy - Alban - Pierre
              - Julie
            </td>
            <td className="contributor-table__creation">1</td>
            <td>0</td>
            <td className="contributor-table__creation">0</td>
            <td>30</td>
            <td className="contributor-table__creation">1</td>
            <td>0</td>
            <td className="contributor-table__creation">0</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default ContributorTable;
