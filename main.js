function logSubmit(e) {
  var input = document.getElementById('getCountry').value;
  e.preventDefault();
  getCountryCase(input);
  console.log(input);
}

function getCountryCase(input) {
  var settings = {
    url: `https://api.covid19api.com/live/country/${input}/status/confirmed`,
    method: 'GET',
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let countries = response.length - 1;
    let confirmed = response[countries].Confirmed;
    let deaths = response[countries].Deaths;
    let recovered = response[countries].Recovered;
    let active = response[countries].Active;
    let country = response[countries].Country;
    let conh3 = document.getElementById('log');
    conh3.innerHTML = `
      <br>
      <h3>There are <span class="confirmed">${confirmed}</span> confirmed cases in ${country}  </h3> 
      <br>
      <h3>There are <span class="deaths">${deaths}</span> deaths in ${country} </h3> 
      <br>
      <h3>There are <span class="recovered">${recovered}</span> recovered cases in ${country}  </h3> 
      <br>
      <h3 class="active">Currently Active: ${active}</h3>
      
      `;
  });
}
const countryForm = document.getElementById('form');
countryForm.addEventListener('submit', logSubmit);

//Search by state

function logSubmitTwo(e) {
  var input2 = document.getElementById('getState').value;
  e.preventDefault();
  console.log(input2);
  getStateCase(input2);
}

function getStateCase(input2) {
  var settings2 = {
    url: `https://api.covid19api.com/live/country/us/status/confirmed`,
    method: 'GET',
    timeout: 0,
  };
  $.ajax(settings2).done(function (response) {
    let state = response.filter(function (usState) {
      return usState.Province == input2;
    });
    let newest = state.length - 1;
    let stateConfirmed = state[newest].Confirmed;
    let stateDeaths = state[newest].Deaths;
    let stateRecovered = state[newest].Recovered;
    let stateActive = state[newest].Active;

    let stateFin = document.getElementById('logTwo');
    stateFin.innerHTML = `
      <br>
      <h3>There are <span class="confirmed">${stateConfirmed}</span> confirmed Cases in ${input2}  </h3> 
      <br>
      <h3>As of Today: <span class="deaths">${stateDeaths}</span> Deaths in ${input2} </h3> 
      <br>
      <h3>As of Today: <span class="recovered">${stateRecovered}</span> Recovered Cases in ${input2}  </h3> 
      <br>
      <h3 class="active">Currently Active: ${stateActive}</h3>
      
      `;
  });
}

const stateForm = document.getElementById('formTwo');

stateForm.addEventListener('submit', logSubmitTwo);
