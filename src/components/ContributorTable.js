import React, { useEffect, useState } from 'react';
import './ContributorTable.scss';
import DataProcessing from '../DataProcessing';
import { fetchFormationsReports, fetchUsers } from '../API';

const ContributorTable = () => {
  const [hasError, setHasError] = useState(false);
  const [formationsReports, changeFormationReports] = useState([]);
  const [users, changeUsers] = useState([]);

  useEffect(() => {
    const setFormationsReports = async () => {
      setHasError(false);
      try {
        const formationsReportsDetails = await fetchFormationsReports();
        changeFormationReports(formationsReportsDetails);
      } catch (e) {
        setHasError(true);
      }
    };
    setFormationsReports();
  }, []);

  useEffect(() => {
    const setUsers = async () => {
      setHasError(false);
      try {
        const usersDetails = await fetchUsers();
        changeUsers(usersDetails);
      } catch (e) {
        setHasError(true);
      }
    };
    setUsers();
  }, []);

  let internalFormationDetails = [];
  let userIdOfActors = [];
  let userNamesOfActors = [];
  if (formationsReports.length !== 0) {
    internalFormationDetails = DataProcessing
      .collectInternalFormationsDetails(formationsReports);

    userIdOfActors = DataProcessing
      .collectActorsUserIds(internalFormationDetails);
    console.log(userIdOfActors);

    const actorsActualYearIds = DataProcessing
      .collectActualYearActorsIds(userIdOfActors, internalFormationDetails, 2021);
    console.log(actorsActualYearIds);

    const otherActorsIds = DataProcessing
      .collectOtherActorsIds(userIdOfActors, internalFormationDetails, 2021);
    console.log(otherActorsIds);

    userNamesOfActors = DataProcessing.createUserNamesTable(userIdOfActors, users);
  }

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
          {internalFormationDetails.length !== 0 && internalFormationDetails.map(
            (internalFormation, index) => (
              <tr key={internalFormation.id}>
                <td key={internalFormation.id} className="ExcellenceCenterTable__row-item">{internalFormation.name}</td>
                <td className="ExcellenceCenterTable__row-item">{userNamesOfActors[index].join(' - ') }</td>
              </tr>
            ),
          )}

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
