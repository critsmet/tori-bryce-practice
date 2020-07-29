let countryContainer = document.getElementById('country-container')
let countriesPath = "http://localhost:3000/countries"

fetch(countriesPath)
  .then(function(obj){
    return obj.json()
  })
  .then(function(countriesArray){
    countriesArray.forEach(function(country){
      countryContainer.innerHTML += makeCountryDiv(country)
    })
  })

function makeCountryDiv(country){
  return `
  <div id=country-${country.id}>
    <div id=country-${country.id}-details>
      <p>Name: <span>${country.name}</span></p>
      <p>Population: <span>${country.population}</span></p>
      <p>National Bird: <span>${country.bird}</span></p>
    </div>
    <ul id=country-${country.id}-cities>
      ${country.cities.map(makeCityLi).join("")}
    </ul>
    <button class="new-city-button" data-country=${country.id}>Add City</button>
    <button id="edit-button-${country.id}" class="edit-button" data-country=${country.id}>Edit Country</button>
    <button>Delete Country</button>
    <p>==============</p>
  </div>
  `
}

function makeCityLi(city){
  return `<li>${city.capital ? city.name + " - Capital" : city.name}</li>`
}

countryContainer.addEventListener('click', function(e){
  if (e.target.className == "edit-button"){
    e.target.disabled = true
    let countryDetailsDiv = document.getElementById(`country-${e.target.dataset.country}-details`)
    let info = [e.target.dataset.country]
    countryDetailsDiv.querySelectorAll('span').forEach(function(span){
       info.push(span.innerText)
    })
    countryDetailsDiv.innerHTML = generateForm(info)
  } else if (e.target.className == "new-city-button"){
    let countryCitiesDiv = document.getElementById(`country-${e.target.dataset.country}-cities`)
    countryCitiesDiv.innerHTML += generateCityForm(e.target.dataset.country)
  }


})

countryContainer.addEventListener('submit', function(e){
  e.preventDefault()
  let countryId = e.target.dataset.country
  let info = []
  e.target.querySelectorAll('input').forEach(function(input){
    console.log(input.value);
    info.push(input.value)
  })
  if (e.target.className === "edit-form" ) {
  //info.pop()
  fetch(`http://localhost:3000/countries/${countryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      country: {
        name: info[0],
        population: info[1],
        bird: info[2]
        }
      })
    })
    let countryDetailsDiv = document.getElementById(`country-${countryId}-details`)
    countryDetailsDiv.innerHTML = `
      <div id=country-${countryId}-details>
        <p>Name: <span>${info[0]}</span></p>
        <p>Population: <span>${info[1]}</span></p>
        <p>National Bird: <span>${info[2]}</span></p>
      </div>`
    document.getElementById(`edit-button-${countryId}`).disabled = false
  } else if (e.target.className === "new-city-form") {
    let citiesUl = document.getElementById(`country-${countryId}-cities`)
    citiesUl.innerHTML += makeCityLi({name: info[0], capital: null})
  }
})

//optimistic vs pessimistic rendering
//in order to follow pessimistic rendering, we need to change the dom in the .then chain after we've received confirmation from the server
//in order to follow optomistic rendering, we can ignore the fetch request basicaly entirely

function generateForm(info){
  return `
    <form class="edit-form" data-country=${info[0]}>
      <label>Name:</label>
      <input type="text" name="name" value="${info[1]}">
      <br/>
      <label>Population:</label>
      <input type="text" name="population" value="${info[2]}">
      <br/>
      <label>National Bird:</label>
      <input type="text" name="bird" value="${info[3]}">
      <br/>
      <input id=edit-country type="submit" value="Submit Country">
    </form>
  `
}

function generateCityForm(countryId){
  return `
    <form class="new-city-form" data-country=${countryId}>
      <label>Name:</label>
      <input type="text" name="name" value="">
      <input id="new-city" type="submit" value="Submit City">
    </form>
  `
}


// let form = `
//   <label>Name:</label>
//   <input type="text" name="name" value="">
//   <br/>
//   <label>Population:</label>
//   <input type="text" name="population" value="">
//   <br/>
//   <label>National Bird:</label>
//   <input type="text" name="population" value="">
//   <br/>
//   <input type="submit" value="Submit Country">
// `




  // let divCard = document.createElement('div')
  // divCard.setAttribute('id', `country-${country.id}`)
  // let name = document.createElement('p')
  // let pop = document.createElement('p')
  // let bird = document.createElement('p')
  // let ul = document.createElement('ul')
  // country.cities.forEach(function(city){
    //   let li = document.createElement('li')
    //   li.innerText = city.name
    //   ul.appendChild(li)
    // })
    // name.innerText = `Name: ${country.name}`
    // pop.innerText = country.population
    // bird.innerText = country.bird
    // divCard.appendChild(name)
    // divCard.appendChild(pop)
    // divCard.appendChild(bird)
    // divCard.appendChild(ul)
    // countryContainer.appendChild(divCard)
    //div with name, population, bird, then ul with lis of city names


















//
