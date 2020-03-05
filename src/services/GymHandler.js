const findBefore = (slot, otherSlot) => {
  return otherSlot.start < slot.start && otherSlot.end > slot.start;
}

const findSame = (slot, otherSlot) => {
  return !Object.is(slot, otherSlot) && slot.start === otherSlot.start;
}

const findAfter = (slot, otherSlot) => {
  return slot.end > otherSlot.start && otherSlot.start > slot.start;
}

export default class GymHandler {
  gyms = [];
  constructor(gyms) {
    this.gyms = gyms;
    this.calculateOverlapping();
  }

  getGyms() {
    return this.gyms;
  }

  getGymByName(name) {
    return this.gyms.find( gym => gym.name === name);
  }

  getHoursForGym(name) {
    let gym = this.getGymByName(name);
    let hours = {};
    gym.days.forEach(day => {
      day.slots.forEach(slot => {
        let value = hours[slot.type] || 0;
        hours[slot.type] = value + (slot.end - slot.start) * slot.gymnasts;
      });
    });
    return hours;
  }

  calculateOverlapping() {
    this.gyms.forEach((gym, i) => {
        gym.days.forEach((day, i) => {
            let slots = day.slots;
            slots.forEach( (slot, index) => {
              let overlap = [[],[],[]];
              slots.forEach(otherSlot => {
                if (findBefore(slot, otherSlot)) {
                  overlap[0].push(otherSlot);
                } else if(findSame(slot, otherSlot)) {
                  overlap[1].push(otherSlot);
                } else if(findAfter(slot, otherSlot)) {
                  overlap[2].push(otherSlot);
                }
              })
              let sum = overlap.reduce( (n,k) => n+k.length, 0);
              if (sum > 0) {
                if(overlap[0].length) {
                  let ovPos = overlap[0].filter( ov => ov.pos !== undefined).map(ov => ov.pos);
                  slot.pos = Array.from({length:overlap[0].length+1},(v,k)=>k+1).filter( num => !ovPos.includes(num)).pop();
                  slot.overlap = overlap[0].length ;
                } else if(overlap[2].length) {
                  slot.pos = 1;
                  slot.overlap = overlap[2].length;
                } else {
                  slot.overlap = overlap[1].length;
                }
              }
            });
          });
        });
  }
}
