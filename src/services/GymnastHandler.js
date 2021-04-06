import { GENDER, DISCIPLINE } from '../util/constants';

export default class GymnastHandler {
  gymnasts = [];
  constructor(gymnasts) {
    this.gymnasts = gymnasts;
  }

  getClubs() {
    return [...new Set(this.gymnasts.map(gymnast => gymnast.name))];
  }

  getAges() {
    return [...new Set(this.gymnasts.map(gymnast => gymnast.age))];
  }

  getMinMaxAge() {
    let ages = this.getAges();
    return {
      min: Math.min.apply(null, ages),
      max: Math.max.apply(null, ages)
    }
  }

  getGymnastsForClub(name) {
      return this.gymnasts.filter(gymnast => name === gymnast.name);
  }

  getGymnastsOfAge(age) {
      return this.gymnasts.filter(gymnast => age === gymnast.age);
  }

  getSummeryByDiscipline(filter = g => true, competitionOnly) {
    let gymnastOfAge = this.gymnasts.filter(filter);
    let disciplineArray = [
      {name: 'KVAG', gymnasts: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.K ).length},
      {name: 'MAG', gymnasts: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.M ).length},
      {name: 'Trupp', gymnasts: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.TRUPP).length}
    ];
    if (!competitionOnly) {
      disciplineArray.push({name: 'Traning', gymnasts: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.NO_COMPETITION).length});
    }
    return disciplineArray;
  }

  getSummeryByAge(filter = g => true, competitionOnly) {
    return this.getAges().filter(filter).map( age => {
      let gymnastOfAge = this.getGymnastsOfAge(age).filter(gymnast => (competitionOnly && gymnast.pname !== DISCIPLINE.NO_COMPETITION) || !competitionOnly);
      return {
        name: age,
        MAG: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.M ).length,
        KVAG: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.K ).length,
        Trupp: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.TRUPP ).length,
        Traning: gymnastOfAge.filter( gymnast => gymnast.pname === DISCIPLINE.NO_COMPETITION ).length,
        Total: gymnastOfAge.length
      }
    });
  };

  getSummeryForClubs(filter = g => true) {
    return this.getClubs().map(name => {
      let clubGymnasts = this.getGymnastsForClub(name).filter(filter);
      return {
        name,
        mag: clubGymnasts.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.M ).length,
        kvag: clubGymnasts.filter( gymnast => gymnast.pname === DISCIPLINE.AG && gymnast.case === GENDER.K ).length,
        trupp: clubGymnasts.filter( gymnast => gymnast.pname === DISCIPLINE.TRUPP ).length,
        traning: clubGymnasts.filter( gymnast => gymnast.pname === DISCIPLINE.NO_COMPETITION ).length,
        total: clubGymnasts.length
      }
    });
  }
}
