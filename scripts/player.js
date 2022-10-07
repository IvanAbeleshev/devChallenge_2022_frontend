const addDataItem=(shortStatistic, maxValue)=>{
    //example item
    //<div class="playersItem"></div>    

    const htightByOneCrime = 60/maxValue;
    for(let index in shortStatistic){
        const calculatedHeight = Math.max(Math.round(shortStatistic[index]*htightByOneCrime), 3);
        playerData.innerHTML += `
        <div class="playersItem" id="${keysShortStatistic.indexOf(index)}" style="height: ${calculatedHeight}px;"></div>
        `;
    }
    coef = (playerData.scrollWidth-Number(styleBody.width.replace('px','')))/Number(styleBody.width.replace('px',''));
}

const controlButton = document.querySelector('.buttonPlayPause');

let indexShortData = 0;
let intervalKey;

controlButton.addEventListener('click', ()=>{  

    if(playerStatus){
        controlButton.setAttribute('src', './src/img/play.svg');
        clearInterval(intervalKey);
    }else{
        if(indexShortData===keysShortStatistic.length-1 || indexShortData === 0){
            setVisibleAllPointsOnMap(false);
            setPositionScrollDiv(0*stepSize, 0);
        }
        controlButton.setAttribute('src', './src/img/pause.svg');
        intervalKey = setInterval(() => {
            if(indexShortData===keysShortStatistic.length-1){
                playerStatus = !playerStatus;
                clearInterval(intervalKey);
                controlButton.setAttribute('src', './src/img/play.svg');
            }
            setVisibleForPointsByIndex(indexShortData, true);
            setPositionScrollDiv(indexShortData*stepSize, indexShortData);
            calculateAndDisplayStatisticOnDate(new Date(keysShortStatistic[indexShortData]));
            indexShortData++;
            
        }, 100); 
    }
    playerStatus = !playerStatus;   
    
});

//scrolling player data panel
let startMove = false;
const scrollElement = document.querySelector('#scrollBar');
const playerContainer = document.querySelector('.player');
const dateContainer = document.querySelector('.dateContainer');

let stylePlayerData = getComputedStyle(playerContainer);
let styleBody = getComputedStyle(document.body);
let minLeftPosition = Number(styleBody.paddingLeft.replace('px', ''));
let maxRightPosition = Number(stylePlayerData.width.replace('px', ''))-16;

let coef = (playerData.scrollWidth-Number(styleBody.width.replace('px','')))/Number(styleBody.width.replace('px',''));
let stepSize = 0;
window.addEventListener('resize',()=>{
    stylePlayerData = getComputedStyle(playerContainer);
    styleBody = getComputedStyle(document.body);
    minLeftPosition = Number(styleBody.paddingLeft.replace('px', ''));
    maxRightPosition = Number(stylePlayerData.width.replace('px', ''))-16;
    coef = (playerData.scrollWidth-Number(styleBody.width.replace('px','')))/Number(styleBody.width.replace('px',''));
    setInitialState();
});
//-----------moving scrol-----------
scrollElement.addEventListener('mousedown',(event)=>{
    startMove = !startMove;
});

playerContainer.addEventListener('mousemove',(event)=>{
    if(startMove){
        
        let currentPosition = event.x-minLeftPosition-8;
        if(currentPosition>=maxRightPosition){
            currentPosition = maxRightPosition;
        }
        if(currentPosition<= 0){
            currentPosition = 0;    
        }
        scrollElement.style.left = `${currentPosition}px`;
        playerData.scrollTo((currentPosition+8)*coef, 0);
        indexShortData = Math.trunc(currentPosition/stepSize);
        if(indexShortData !== previouslyIndexItemPlayer){
            setDateInDateContainer(indexShortData);
            changeStyleItemPlayer(indexShortData);
            calculateAndDisplayStatisticOnDate(new Date(keysShortStatistic[indexShortData]));
            if(indexShortData>=previouslyIndexItemPlayer){
                let tempIndex = previouslyIndexItemPlayer;
                while(tempIndex<=indexShortData){
                    setVisibleForPointsByIndex(tempIndex, true);
                    tempIndex++;
                }
                setVisibleForPointsByIndex(indexShortData, true);   
            }else{
                let tempIndex = previouslyIndexItemPlayer;
                while(tempIndex>indexShortData){
                    setVisibleForPointsByIndex(tempIndex, false);
                    tempIndex--;
                }
            }
            previouslyIndexItemPlayer = indexShortData;
        }
        

    }
})
//----------------------


playerData.addEventListener('click', (event)=>{
    //1. set current position scroll div and change date
    //2. set statistic to selected date
    //3. drowing point on map
    if(event.target!==playerData){
        const indexOfSelectedItem = event.target.getAttribute('id');
        setPositionScrollDiv(indexOfSelectedItem*stepSize, indexOfSelectedItem);
        calculateAndDisplayStatisticOnDate(new Date(keysShortStatistic[indexOfSelectedItem]));
        setVisibleToIndex(indexOfSelectedItem);
    }

});


const setPositionScrollDiv=(leftPossition, indexOfSelectedItem)=>{
    scrollElement.style.left = `${leftPossition}px`;
    playerData.scrollTo((leftPossition+8)*coef, 0);    
    indexShortData = indexOfSelectedItem;
    if(indexShortData !== previouslyIndexItemPlayer){
        setDateInDateContainer(indexShortData);
        changeStyleItemPlayer(indexShortData);
        previouslyIndexItemPlayer = indexShortData;
    }
}