function logSubmit(e) {
  var input = document.getElementById('getCountry').value;
  e.preventDefault();
  getCountryCase(input);
}

function getCountryCase(input) {
  var settings = {
    url: `https://api.covid19api.com/summary`,
    method: 'GET',
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let ourCountry = response.Countries.filter(function (usCountry) {
      return usCountry.Country == input;
    });

    let origin = ourCountry[0].Country;
    let newConfirmed = ourCountry[0].NewConfirmed;
    let newDeaths = ourCountry[0].NewDeaths;
    let newRecovered = ourCountry[0].NewRecovered;
    let totalConfirmed = ourCountry[0].TotalConfirmed;
    let totalDeaths = ourCountry[0].TotalDeaths;
    let totalRecovered = ourCountry[0].TotalRecovered;

    let countryFin = document.getElementById('log');
    countryFin.innerHTML = `
      <br>
      <h3><span class="confirmed">${totalConfirmed}</span> Confirmed Cases in ${origin}  </h3> 
      <br>
      <h3><span class="deaths">${totalDeaths}</span> Deaths in ${origin} </h3> 
      <br>
      <h3><span class="recovered">${totalRecovered}</span> Recovered Cases in ${origin}  </h3> 
      <br>
      <h3 class="active">Currently Active: ${totalConfirmed}</h3>
      
      `;
  });
  resetCountryValue();
}
function resetCountryValue() {
  document.getElementById('getCountry').value = '';
  document.getElementById('getCountry').focus();
}

const countryForm = document.getElementById('form');
countryForm.addEventListener('submit', logSubmit);

//Search by state

function logSubmitTwo(e) {
  var input2 = document.getElementById('getState').value;
  e.preventDefault();
  getStateCase(input2);
}
function resetStateValue() {
  document.getElementById('getState').value = '';
  document.getElementById('getState').focus();
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
  resetStateValue();
}

const stateForm = document.getElementById('formTwo');

stateForm.addEventListener('submit', logSubmitTwo);
