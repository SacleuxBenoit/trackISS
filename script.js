// get id of latitude,longitude && altitude
let pLatitude = document.getElementById('lat');
let pLongitude = document.getElementById('long');
let pAltitude = document.getElementById('alt');
let pVisibility = document.getElementById('visibility');
let pVelocity = document.getElementById('velocity');

// Making map and tiles 
let map = L.map('map').setView([0, 0], 1);
let attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'; 
let tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(tileURL,{attribution});
tiles.addTo(map); 

// Making marker with icon
let issIcon = L.icon({
    iconUrl: './images/iss.png',
    iconSize: [50, 40],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
});
let marker = L.marker([0, 0],{icon: issIcon}).addTo(map);
let api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS(){
    let response = await fetch(api_url);
    let data = await response.json();
    let { latitude, longitude, altitude, visibility, velocity} = data;
    marker.setLatLng([latitude,longitude]);
    console.log(data);
    L.circle([latitude, longitude], {radius: 200}).addTo(map);
    map.panTo([latitude,longitude],7) 
    pLatitude.textContent = latitude.toFixed(4);
    pLongitude.textContent = longitude.toFixed(4);
    pAltitude.textContent = altitude.toFixed(2);
    pVelocity.textContent = velocity.toFixed(2)
    pVisibility.textContent = visibility;
}

// refresh the function getISS every 1 second
setInterval(getISS,1000);
getISS();