const getStatisticOnDate = (arrayOfCrimes, descriptions, date) =>{
    if(!date){
        date = new Date();
    }

    const previousStatisticData = {};
    for(let i=0; i<arrayOfCrimes.length; i++){
        if(arrayOfCrimes[i].date>date){
            break;
        }
        if(!arrayOfCrimes[i].content.affected_type){
            continue;
        }
        if(!previousStatisticData[arrayOfCrimes[i].content.affected_type]){
            previousStatisticData[arrayOfCrimes[i].content.affected_type] = Number(arrayOfCrimes[i].content.affected_number);    
            continue;
        }

        previousStatisticData[arrayOfCrimes[i].content.affected_type] += Number(arrayOfCrimes[i].content.affected_number);
    }    

    const arrayOfStatistic = [];
    const arrayOfKeys = Object.keys(previousStatisticData);
    arrayOfKeys.forEach(element=>arrayOfStatistic.push({code: element, description: descriptions.affected_type[element], statistic: previousStatisticData[element]}));

    return arrayOfStatistic;
}

const displayCurrentStatisctic = (currentStatistic) =>{
    //exmple what need add to statisticList

    // <li class="itemCrimes">
    //     <h1 class="counterStatistic">1234</h1>
    //     <span class="additionalText">killed militaries</span>
    // </li>
  
    let innerText = '';
    for(let index=0; index<currentStatistic.length; index++){
        innerText+=`<li class="itemCrimes"><h1 class="counterStatistic">${currentStatistic[index].statistic}</h1><span class="additionalText">${currentStatistic[index].description}</span></li>`
    }

    statisticList.innerHTML = innerText;

}

const calculateAndDisplayStatisticOnDate=(date)=>{
    const currentStatistic = getStatisticOnDate(dataStatistic, specificationByLanguage, date);
    displayCurrentStatisctic(currentStatistic);
}