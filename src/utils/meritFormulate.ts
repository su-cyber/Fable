export default function meritFormulate(grade:String){
    if(grade == "E"){
        return 500
    }
    else if(grade == "D"){
        return 2000
    }
    else if(grade == "C"){
        return 5000
    }
    else if(grade == "B"){
        return 15000
    }
    else if(grade == "A"){
        return 40000
    }
}