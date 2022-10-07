///edge point of Ukraine by coordinates
const coefficientX = (40.1341-22.0814)/689; 
const coefficientY = (52.2245-44.2314)/459; 

const getCoordinateOnpixel = (x, y) =>{
    return {
        x: Math.trunc((x-22.0814)/coefficientX),
        y: Math.trunc((52.2245-y)/coefficientY),
    }
}