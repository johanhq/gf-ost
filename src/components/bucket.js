import React, { useState, useEffect } from 'react';

import B from './block';

const Buckets = () => {
  const [bucketSize, setBucketSize] = useState(10);
  const [result, setResult] = useState([]);
  const [club, setClub] = useState('');
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const countTot = dataSet => {
      let roundTot = 0;
      for( let key in dataSet) {
        if (dataSet.hasOwnProperty(key)) {
          roundTot += +dataSet[key];
        }
      }
      return roundTot;
    }

    const drawRounds = () => {
      let dataClone = {...data};
      let rounds = [];
      let roundTot = countTot(dataClone);
      while (roundTot > 0 ) {
        let round = [];
        let fairnesBucket = [];
        for( let key in dataClone) {
          if (dataClone.hasOwnProperty(key)) {

            let num = dataClone[key];
            let countPerRound = Math.floor(num / roundTot * bucketSize);
            if (countPerRound >= 1 ) {
              countPerRound = countPerRound < num ? countPerRound : num;
              round = [...round, ...Array(countPerRound).fill(key)];
              dataClone[key] = num - countPerRound;
            } else if (num > 0){
              fairnesBucket = [...fairnesBucket,...Array(num).fill(key)]
            }
          }
        }
        while ( round.length < bucketSize && fairnesBucket.length) {
          let randomElementIndex = Math.floor(Math.random() * fairnesBucket.length);
          let randomElement = fairnesBucket[randomElementIndex];
          round.push(randomElement);
          fairnesBucket = fairnesBucket.filter( element => element !== randomElement)
          dataClone[randomElement] = dataClone[randomElement] - 1;
        }
        rounds.push(round);
        roundTot = countTot(dataClone);
      }
      return rounds;
    }
    setResult(drawRounds);
  }, [bucketSize, data]);

  const changeBucketSize = e => {
    if(e.target.value > 0)
      setBucketSize(e.target.value)
    else {
      setBucketSize(1)
    }
  }

  const addItem = e => {
    e.preventDefault();
    let newData = {...data};
    newData[club] = count;
    setData(newData);
    setClub('')
    setCount(0)
  }

  const remove = id => {
    let newData = {...data};
    delete newData[id];
    setData(newData);
  }

  return (
    <div>
      <B style={{margin: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '4px'}}>
        <label>Storlek på hink<br/><input type="number" value={bucketSize} onChange={ (e) => changeBucketSize(e) }/></label>
        <B style={{paddingTop: '1rem'}}>
          <form onSubmit={addItem}>
            <input value={club} placeholder="Förening" onChange= { e => setClub(e.target.value)} style={{marginRight:'1rem'}}/>
            <input value={count} placeholder="Antal" onChange= { e => setCount(+e.target.value)} style={{marginRight:'1rem'}}/>
            <button type="submit">{data[club] ? 'Ändra':'Lägg till'}</button>
          </form>
        </B>
      </B>
      <Clubs data={data} remove={remove}/>
      <Results results={result}/>
    </div>
  )
}

const Results = ({results}) => {
  return (<div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>{results.map( (result, i) => <Result result={result} key={i} round={i+1}/>)}</div>);
}

const Clubs = ({data, remove}) => {
  return (
    <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
      {Object.entries(data).map( ([key, value]) => <B key={key} style={{margin: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '4px', position: 'relative'}}>{key}: {value}<B style={{color:'red', position: 'absolute', top: '2px',right: '4px', fontSize: '0.75rem', cursor: 'pointer'}} onClick={e => remove(key)}>X</B></B> )}
    </div>
  );
}

const Result = ({ result, round}) => {
  return (
    <B style={{minWidth: 'calc(100%/3 - 2rem)', width: 'calc(100%/3 - 2rem)', margin: '1rem', backgroundColor: 'white', borderRadius: '4px'}}>
      <B style={{display: 'flex', justifyContent:'space-between', padding: '1rem', alignItems: 'baseline'}}>
        <B component="h3" style={{margin: '0'}}>Runda {round}</B>
      </B>
      {result.map( (name, i) => <Line key={i}>{name}</Line>)}
    </B>
  );
}

const Line = ({children}) => (
  <B style={{display: 'flex', justifyContent:'space-between', borderTop: '1px solid #e5e5e5', padding: '1rem'}}>
    {children}
  </B>
);

export default Buckets;
