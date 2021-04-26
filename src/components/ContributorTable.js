import React from 'react';
import './ContributorTable.scss';

const ContributorTable = () => (
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
        <tr>
          <td>Git partie 1</td>
          <td className="contributor-table__contributors-name">Teddy - Alban - Pierre - Julie - Teddy - Alban - Pierre - Julie</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Git partie 2</td>
          <td className="contributor-table__contributors-name">Coralie</td>
          <td className="contributor-table__creation">0</td>
          <td>1</td>
          <td className="contributor-table__creation">0</td>
          <td>23</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Initiation TDD</td>
          <td className="contributor-table__contributors-name">Alban</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Ergo-conception</td>
          <td className="contributor-table__contributors-name">Teddy</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Introduction aux tests</td>
          <td className="contributor-table__contributors-name">Coralie</td>
          <td className="contributor-table__creation">0</td>
          <td>0</td>
          <td className="contributor-table__creation">30</td>
          <td>1</td>
          <td className="contributor-table__creation">0</td>
          <td>0</td>
          <td className="contributor-table__creation">30</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Méthodologie</td>
          <td className="contributor-table__contributors-name">Alban</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Ergo-recueil du besoin</td>
          <td className="contributor-table__contributors-name">Teddy</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
          <td className="contributor-table__creation">1</td>
          <td>0</td>
          <td className="contributor-table__creation">0</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Ergonomie du code</td>
          <td className="contributor-table__contributors-name">Coralie</td>
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

export default ContributorTable;
