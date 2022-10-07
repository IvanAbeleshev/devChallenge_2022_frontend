Promise.all([data, specification]). then(([data, specification])=>{
    data.sort((ob1, ob2)=> new Date(ob1.from)-new Date(ob2.from))
    specificationByLanguage = specification[language];
    
    let maxValue = 0;

    data.forEach(element => {
        //if we have a field affected_type then we also have a field affected_number
        if(element.affected_type){
            const {affected_type, affected_number} = element;
            const currentDate = new Date(element.from);
            dataStatistic.push({
                date: currentDate,
                dateString: element.from,
                content: {
                    affected_type: affected_type[0],
                    affected_number: affected_number[0],
                    lon: element.lon,
                    lat: element.lat 
                }
            });   

            if(!shortStatistic[currentDate]){
                shortStatistic[currentDate] = Number(affected_number[0]);
            }else{
                shortStatistic[currentDate] += Number(affected_number[0]);
            }
            maxValue = Math.max(maxValue, shortStatistic[currentDate]);
        }

    });

    const currentStatistic = getStatisticOnDate(dataStatistic, specificationByLanguage);
    displayCurrentStatisctic(currentStatistic);
    
    keysShortStatistic = Object.keys(shortStatistic);
    drowAllPoints();
    addDataItem(shortStatistic, maxValue);

    setInitialState();

}
);