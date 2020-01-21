const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastResultTitle = document.querySelector('#forecast-result').querySelector('h3');
const forecastResult = document.querySelector('#forecast-result').querySelector('p');
const timezoneElement = document.querySelector('#forecast-result').querySelector('b');
const errorMessage = document.querySelector('#error-message');

weatherForm.addEventListener('submit',(event) => {
    // prevents the form from running its default event 
    //which refreshes the whole page when submitted
    event.preventDefault(); 

    const address = search.value;
    
    if(address){
        errorMessage.textContent = '';
        forecastResultTitle.textContent = 'Loading...';
        forecastResult.textContent = '';
        timezoneElement.textContent = '';

        fetch('/weather?address='+address).then((response)=>{
            response.json().then((data) => {

                if(data.error){ 
                    errorMessage.textContent = data.error;
                    forecastResultTitle.textContent = '';
                    return;
                }
                forecastResultTitle.textContent = data.location;
                forecastResult.textContent = data.forecast;
                timezoneElement.textContent = 'Timezone: '+data.timezone;
            });
        });
    }
});