//--------------------work with points--------------------------
const addPointToTheMap =(x, y, className, color='red', fillOpacity=1 )=>{
    const circle = document.createElementNS(svgns,'circle');
    circle.setAttributeNS(null, 'r', '1');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'fill', color);
    circle.setAttributeNS(null, 'fill-opacity', fillOpacity);
    circle.classList.add(className);
    rootElement.append(circle);
};

const drowAllPoints=()=>{
    for(let i=0; i<dataStatistic.length; i++){
        if(dataStatistic[i].content.lon){
            const coordinateInPixel = getCoordinateOnpixel(Number(dataStatistic[i].content.lon), Number(dataStatistic[i].content.lat));
            addPointToTheMap(coordinateInPixel.x, coordinateInPixel.y, `point${keysShortStatistic.indexOf(String(dataStatistic[i].date))}`);
        }
    }
}

const setVisibleAllPointsOnMap=(visible)=>{
    const pointsList = document.querySelectorAll('circle');
    pointsList.forEach(element=>element.setAttributeNS(null, 'fill-opacity', visible?1:0));
}

const setVisibleForPointsByIndex=(indexShortData, visible)=>{
    const pointsList = rootElement.querySelectorAll(`.point${indexShortData}`);
    pointsList.forEach(element=>element.setAttributeNS(null, 'fill-opacity', visible?1:0));
}

const setVisibleToIndex=(indexOfSelectedItem)=>{
    
    let currentIndex = 0;
    while(currentIndex < keysShortStatistic.length){
        const pointsList = rootElement.querySelectorAll(`.point${currentIndex}`);
        pointsList.forEach(element=>element.setAttributeNS(null, 'fill-opacity', currentIndex<=indexOfSelectedItem?1:0));    
        currentIndex++;
    }
}

//--------------------------------------------------------------

let previouslyIndexItemPlayer;

const changeStyleItemPlayer =(idIlement)=>{
    const currentColumn = document.getElementById(`${idIlement}`);
    currentColumn.classList.remove('playersItem');
    currentColumn.classList.add('playersItemActive');

    if(previouslyIndexItemPlayer!==undefined){
        const previouslyItem = document.getElementById(`${previouslyIndexItemPlayer}`);
        previouslyItem.classList.add('playersItem');
        previouslyItem.classList.remove('playersItemActive');
    }
}

const setInitialState = () =>{
    scrollElement.style.left = `${maxRightPosition}px`;
    playerData.scrollTo(maxRightPosition, 0);
    stepSize = (maxRightPosition+1)/keysShortStatistic.length;
    indexShortData = keysShortStatistic.length-1;
    changeStyleItemPlayer(indexShortData);
    previouslyIndexItemPlayer = indexShortData;
    setDateInDateContainer();
}

const setDateInDateContainer=(index=0)=>{
    dateContainer.innerHTML = new Date(keysShortStatistic[index]).toLocaleDateString(languageFullName);
}
