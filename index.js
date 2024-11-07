var api_selection = document.getElementById("api-selection");
var main_data = document.getElementById("main");
var API_KEY = "";

api_selection.addEventListener('change', (e) => {
    var api = e.target.value;
    console.log(e.target.value);

    if (api === "stars") {
        main_data.innerHTML = `<div class="filters-section"></div>
                <h4 class="filters-title">Filters</h4>
                
                <div class="filters">
                    <input type = "number" class="input" placeholder="Max Distance (ly)" id = "max-distance"/>
                    <input type = "number" class="input" placeholder="Min Distance (ly)" id = "min-distance"/>
                    <input type = "number" class="input" placeholder="Max Brightness" id = "max-brightness"/>
                    <input type = "number" class="input" placeholder="Min Brightness" id = "min-brightness"/>
                    <button class="filter-button" id = "filter-button" onclick = {createURL()}>Filter Search</button>
                </div>
                
            </div>

            

            <div class="data" id="data">
                
            </div>`;
    } else if (api === "planets") {
        main_data.innerHTML = `<div class="filters-section">
                <h4 class="filters-title">Filters</h4>
                
                <div class="filters">
                    <input type = "number" class="input" placeholder="Max Distance (ly)" id = "max-distance"/>
                    <input type = "number" class="input" placeholder="Min Distance (ly)" id = "min-distance"/>
                    <input type = "number" class="input" placeholder="Max Mass (kg)" id = "max-mass"/>
                    <input type = "number" class="input" placeholder="Min Mass (kg)" id = "min-mass"/>
                    <button class="filter-button" id = "filter-button" onclick = {createURL()}>Filter Search</button>
                </div>
                
            </div>

            

            <div class="data" id="data">
                
            </div>`;
    }
})

function createURL() {
    var list = document.getElementById("data");
    var filter_button = document.getElementById("filter-button");
    
    list.innerHTML = '';
    var url = "https://api.api-ninjas.com/v1/";
    

    if (api_selection.value === "planets") {
        //This is us getting the inputs of the user
        var min_distance = document.getElementById("min-distance").value;
        var max_distance = document.getElementById("max-distance").value;
        var min_mass = document.getElementById("min-mass").value;
        var max_mass = document.getElementById("max-mass").value;
        
        url = url + "planets?";

        //This is us formatting the inputted data into the URL, so our API understands what we're asking for
        if (min_distance !== "") url = url + "min_distance_light_year=" + min_distance + "&";
        if (max_distance !== "") url = url + "max_distance_light_year=" + max_distance + "&";
        if (min_mass !== "") url = url + "min_mass=" + min_mass + "&";
        else url = url + "min_mass=1" + "&";
        if (max_mass !== "") url = url + "max_mass=" + max_mass + "&";

        if (url.endsWith("&")) url = url.substring(0, url.length - 1);

        //TODO: Now that we have our URL, we need to make a request to our API!
        fetch(url, {
            method: 'GET',
            contentType: 'application/json',
            headers: {
                "X-Api-Key": API_KEY,
            }
        }).then(response => response.json().then(data => populateWebpagePlanets(data)));

    } else if (api_selection.value === "stars") {
        //This is us getting the inputs of the user
        var min_distance = document.getElementById("min-distance").value;
        var max_distance = document.getElementById("max-distance").value;
        var min_brightness = document.getElementById("min-brightness").value;
        var max_brightness = document.getElementById("max-brightness").value;
        
        url = url + "stars?";

        //This is us formatting the inputted data into the URL, so our API understands what we're asking for
        if (min_distance !== "") url = url + "min_distance_light_year=" + min_distance + "&";
        else url = url + "min_distance_light_year=1" + "&";
        if (max_distance !== "") url = url + "max_distance_light_year=" + max_distance + "&";
        if (min_brightness !== "") url = url + "min_apparent_magnitude=" + min_mass + "&";
        if (max_brightness !== "") url = url + "max_apparent_magnitude=" + max_mass + "&";

        if (url.endsWith("&")) url = url.substring(0, url.length - 1);

        //TODO: Now that we have our URL, we need to make a request to our API!
        fetch(url, {
            method: 'GET',
            contentType: 'application/json',
            headers: {
                "X-Api-Key": API_KEY,
            }
        }).then(response.json().then(data => populateWebpageStars(data)));
    }
}

//This function takes JSON information and displays the information to the user
function populateWebpagePlanets(data) {
    var list = document.getElementById("data");
    var title, distance, period, mass, box;
    
    for (let i = 0; i < data.length; i++) {
        title = document.createElement("h3");
        distance = document.createElement("h3");
        period = document.createElement("h3");
        mass = document.createElement("h3");

        title.innerHTML = data[i].name;
        distance.innerHTML = "Distance: " + data[i].distance_light_year + " Light Years";
        period.innerHTML = "Period: " + data[i].period;
        mass.innerHTML = "Mass: " + data[i].mass;

        title.classList.add("data-box-header");
        distance.classList.add("data-box-text");
        period.classList.add("data-box-text");
        mass.classList.add("data-box-text");

        box = document.createElement("div");
        box.classList.add("data-box");
        box.appendChild(title);
        box.appendChild(distance);
        box.appendChild(period);
        box.appendChild(mass);

        list.appendChild(box);
    }
}

//This function takes JSON information and displays the information to the user
function populateWebpageStars(data) {
    var list = document.getElementById("data");
    var title, distance, constellation, brightness, box;
    
    for (let i = 0; i < data.length; i++) {
        title = document.createElement("h3");
        distance = document.createElement("h3");
        constellation = document.createElement("h3");
        brightness = document.createElement("h3");

        title.innerHTML = data[i].name;
        distance.innerHTML = "Distance: " + data[i].distance_light_year + " Light Years";
        constellation.innerHTML = "Constellation: " + data[i].constellation;
        brightness.innerHTML = "Period: " + data[i].apparent_magnitude;

        title.classList.add("data-box-header");
        distance.classList.add("data-box-text");
        constellation.classList.add("data-box-text");
        brightness.classList.add("data-box-text");

        box = document.createElement("div");
        box.classList.add("data-box");
        box.appendChild(title);
        box.appendChild(distance);
        box.appendChild(constellation);
        box.appendChild(brightness);

        list.appendChild(box);
    }
}