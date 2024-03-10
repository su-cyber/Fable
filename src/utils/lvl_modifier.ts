export default function lvl_modifier(level:number){
  if (level === 1) {
      return 1;
    } else if (level >= 2 && level <= 3) {
      return 1.2;
    } else if (level >= 4 && level <= 5) {
      return 1.25;
    } else if (level >= 6 && level <= 7) {
      return 1.65;
    } else if (level >= 8 && level <= 9) {
      return 1.9;
    } else if (level >= 10 && level <= 13) {
      return 2;
    } else if (level === 14) {
      return 2.1;
    } else if (level === 15) {
      return 2.25;
    } else if (level === 16 || level === 17) {
      return 2.3;
    } else if (level === 18) {
      return 2.4;
    } else if (level === 19) {
      return 2.5;
    } else if (level === 20) {
      return 2.6;
    } else if (level === 21) {
      return 2.7;
    } else if (level === 22) {
      return 2.8;
    } else if (level === 23) {
      return 2.9;
    } else if (level === 24) {
      return 3;
    } else if (level === 25) {
      return 3.1;
    } else {
      return 3.2; // default value
    }
}
