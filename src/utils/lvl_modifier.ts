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
      } else if (level === 10 || level === 11 || level === 12 || level === 13) {
        return 2;
      } else {
        
        return 0; // or another default value
      }
    }
    
    
    