import React, { useState } from 'react';
import B from './block';
import { COLOR } from '../util/constants';


function Gyms({gymHandler}) {
  const [small, setSmall] = useState(true);
  let gymElements = gymHandler.getGyms().map(gym => <GymElement small={small} gym={gym} hours={gymHandler.getHoursForGym(gym.name)} key={gym.name}/>);

  return (
    <B style={{display:'flex', flexWrap: 'wrap', margin: '0 1rem'}}>
      <B style={{width: '100%'}}>
        <B style={{padding: '1rem'}}>
          <label><input type="checkbox" checked={small} onChange={ () => setSmall(!small) }/> Visa små scheman</label>
        </B>
      </B>
      {gymElements}
    </B>
  )
}

function GymElement({ small, gym, hours }) {
  let style = {
    minWidth: small ? 'calc(50% - 2rem)' : 'calc(100% - 1rem)',
    margin: '1rem',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '1rem',
    boxSizing: 'border-box'
  };

  return (
    <B style={style}>
      <B component="h3" style={{marginTop: 0}}>{gym.name}</B>
      <Week gym={gym} small={small}/>
      <B style={{display:'flex', marginTop: '1rem'}}>
        {Object.keys(hours).map( type => (
          <B style={{margin: '0 0.5rem 0 0', display:'flex', alignItems: 'center'}} key={type}>
            <B style={{width: '1rem', height: '1rem', backgroundColor: COLOR[type].PRIMARY, marginRight: '0.5rem'}}>
              <B style={{width: '1rem', height: '2px', backgroundColor: COLOR[type].DARK}}></B>
            </B>
            <B>{type}: {hours[type]}h</B>
          </B>
        ))}
      </B>
    </B>
  );
}

  function Week({gym, small = false}) {
    let numOfDays = gym.days.length;
    let days = gym.days.map( (day, index) => (
      <Days
        key={day.label}
        start={gym.start}
        end={gym.end}
        small={small} {...day}
        last={numOfDays === index+1}/>
      ));
    return (
      <B style={{display:'flex', width: '100%'}}>
        <Hours start={gym.start} end={gym.end} small={small}/>
        {days}
      </B>
    )
  }

  function Hours({start, end, small}) {
    let height = small ? 0.5 : 2;
    let hours = [<B style={{height: `${height}rem`}} key="label"></B>];
    const style = {
      borderTop: '1px solid #e3e3e3',
      height: `${height}rem`,
      boxSizing: 'border-box',
      paddingRight: '1rem',
      fontSize: small ? '0.5rem' : '1rem'
    };
    for(let i = start; i < end; i++ ) {
      hours.push(<B style={style} key={i}>{i < 10 ? '0'+i : i}:00</B>)
      hours.push(<B style={{height:`${height}rem`}} key={i+0.5}></B>)
    }
    hours.push(<B style={style} key="end">{end}:00</B>)

    return (<B style={{}}>{hours}</B>)
  }

  function Days({start, end, last, label, slots, small}) {
    let height = small ? 0.5 : 2;
    let hours = [<B style={{fontSize: small ? '0.5rem' : '1rem', height:`${height}rem`, textAlign: 'center', fontWeight: 'bold'}} key="label">{label}</B>];
    const style = {
      borderTop: '1px solid #e3e3e3',
      borderLeft: '1px solid #e3e3e3',
      borderRight: last ? '1px solid #e3e3e3' : 'none',
      height: `${height}rem`,
      boxSizing: 'border-box',
      position: 'relative'
    };
    let i = start;
    while( i < end ) {
      const index = i;
      let hs = slots.filter( slot => slot.start === index);
      let hsElements = hs.map((slot, n) => {
        let duration = slot.end - slot.start;
        let hsStyle = {
          height:`${duration * height * 2}rem`,
          backgroundColor: COLOR[slot.type].PRIMARY,
          borderTop: `2px solid ${COLOR[slot.type].DARK}`,
          boxSizing: 'border-box',
          position: 'relative',
          padding: '0.5rem',
          fontSize: '0.75rem',
          flexGrow: slot.overlap ? 0 : 1
        }

        if ( slot.overlap ) {
          let width = 100/(slot.overlap+1);
          hsStyle.width = `${width}%`;
          if ( hs.length === 1 ) {
            hsStyle.left =  (slot.pos-1) * width + '%';
          }
        }
        return (
          <B key={index +'-'+n} style={hsStyle}>
            {!small && <B style={{ writingMode: 'tb-rl'}}>{slot.type}: {slot.gymnasts}st</B>}
          </B>
        );
      });
      hours.push(<B style={{...style, zIndex: 100-i*2, display: 'flex'}} key={i}>{hsElements}</B>)
      i += 0.5;
    }
    hours.push(<B style={{...style, borderLeft:'none', borderRight: 'none'}} key="end"></B>)
    return (
      <B style={{flexGrow:2, maxWidth: '14%'}}>
        {hours}
      </B>
    )
  }


export default Gyms;
