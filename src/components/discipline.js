import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import InputRangeCSS from 'react-input-range/lib/css/index.css';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import B from './block';
import pensum from '../data/pensum.json'
import Gymnasthandler from '../services/GymnastHandler.js';
import { DISCIPLINE, COLOR } from '../util/constants';

const Discipline = () => {

  const [range, setRange] = useState({ min: 7, max: 28 });
  const [ageData, setAgeData] = useState();
  const [disciplineData, setDisciplineData] = useState();
  const [competitionOnly, setCompetitionOnly] = useState(true);

  let gymnastHandler = new Gymnasthandler(pensum);
  let minMax = gymnastHandler.getMinMaxAge();

    useEffect(() => {
      let ageSummery = gymnastHandler.getSummeryByAge(age => age >= range.min && age <= range.max, competitionOnly);
      let disciplineSummery = gymnastHandler.getSummeryByDiscipline(gymnast => gymnast.age >= range.min && gymnast.age <= range.max, competitionOnly);
      setAgeData(ageSummery);
      setDisciplineData(disciplineSummery);
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
      <B style={{maxWidth:'1000px', margin: '2rem auto', backgroundColor: 'white', borderRadius: '4px', paddingTop: '1rem'}}>
        <B component="h2" style={{margin:'0 1rem'}}>Gymnaster per ålder</B>
        { ageData && <LineChart
            width={1000}
            height={400}
            data={ageData}
            margin={{top: 30, right: 30, left: 0, bottom: 20}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="KVAG" stroke={COLOR.KVAG.PRIMARY}/>
          <Line type="monotone" dataKey="MAG" stroke={COLOR.MAG.PRIMARY}/>
          <Line type="monotone" dataKey="Trupp" stroke={COLOR.TRUPP.PRIMARY}/>
          { !competitionOnly && <Line type="monotone" dataKey="Traning" stroke={COLOR.TRANING.PRIMARY}/>}
          <Line type="monotone" dataKey="Total" activeDot={{ r: 8 }}/>
        </LineChart>}
      </B>
      <B style={{maxWidth:'1000px', margin: '0 auto', backgroundColor: 'white', borderRadius: '4px', paddingTop: '1rem'}}>
        <B component="h2" style={{margin:'0 1rem'}}>Gymnaster per disciplin ålder {range.min}-{range.max}år</B>
        { disciplineData && <BarChart
            width={1000}
            height={400}
            data={disciplineData}
            margin={{top: 30, right: 30, left: 0, bottom: 20}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar barSize={20} fill="#8884d8" dataKey="gymnasts"/>
        </BarChart>}
      </B>
    </div>
  );
}

export default Discipline;
