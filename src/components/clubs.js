import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import InputRangeCSS from 'react-input-range/lib/css/index.css';

import B from './block';
import pensum from '../data/pensum.json'
import Gymnasthandler from '../services/GymnastHandler.js';
import { DISCIPLINE } from '../util/constants';

const Clubs = () => {
  const [range, setRange] = useState({ min: 7, max: 28 });
  const [gyms, setGyms] = useState([]);
  const [competitionOnly, setCompetitionOnly] = useState(true);

  let gymnastHandler = new Gymnasthandler(pensum);
  let minMax = gymnastHandler.getMinMaxAge();

  useEffect(() => {
    const filter = gymnast => {
      if (competitionOnly) {
        return gymnast.age >= range.min && gymnast.age <= range.max && gymnast.pname !== DISCIPLINE.NO_COMPETITION;
      } else {
        return gymnast.age >= range.min && gymnast.age <= range.max ;
      }
    };
    setGyms(gymnastHandler.getSummeryForClubs(filter));
  }, [range,competitionOnly]);

  return (
    <div>
    <B style={{padding: '2rem'}}>
    <InputRange
      formatLabel={value => `${value}år`}
      maxValue={minMax.max}
      minValue={minMax.min}
      value={range}
      onChange={setRange} />
      </B>
      <B style={{padding: '1rem'}}>
        <label><input type="checkbox" checked={competitionOnly} onChange={ () => setCompetitionOnly(!competitionOnly) }/> Bara tävling</label>
      </B>
      <ClubElm gyms={gyms} training={!competitionOnly}/>
    </div>
  )
}

const ClubElm = ({gyms, training}) => {
  return (<div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>{gyms.map( gym => <Gym gym={gym} key={gym.name} training={training}/>)}</div>);
}

const Gym = ({ gym, training}) => {
  return (
    <B style={{minWidth: 'calc(100%/3 - 2rem)', width: 'calc(100%/3 - 2rem)', margin: '1rem', backgroundColor: 'white', borderRadius: '4px'}}>
      <B style={{display: 'flex', justifyContent:'space-between', padding: '1rem', alignItems: 'baseline'}}>
        <B component="h3" style={{margin: '0'}}>{gym.name}</B>
        <B>{gym.total}</B>
      </B>
      <Line>
        <B>MAG:</B><B>{gym.mag}</B>
      </Line>
      <Line><B>KVAG:</B><B>{gym.kvag}</B></Line>
      <Line><B>Trupp:</B><B>{gym.trupp}</B></Line>
      { training && <Line><B>Ej tävling:</B><B>{gym.traning}</B></Line> }
    </B>
  );
}

const Line = ({children}) => (
  <B style={{display: 'flex', justifyContent:'space-between', borderTop: '1px solid #e5e5e5', padding: '1rem'}}>
    {children}
  </B>
);

export default Clubs;
