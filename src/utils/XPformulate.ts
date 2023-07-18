export default function xpFormulate(level:number){
    let xp

    if(level>=10 && level<50){
        xp = Math.floor(((100-level)*level**4)/500)
    }
    else if(level>=50 && level<68){
        xp = Math.floor(((150-level)*level**4)/1000)
    }
    else if(level < 10){
        xp = Math.floor(((100-level)*level**3)/50)
    }

    return xp
}