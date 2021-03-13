var latitude;
var longitude;
var direction;


function onChatBotReady() {
    // You have to define HTML meta "bs:input:googlemapsKey" in order to inform bot send data to googlemapsKey parameter webview
    var apiKey = BotStarWebview('getParameter', 'googlemapsKey');

    // You have to define HTML meta "bs:input:latitude" in order to inform bot send data to latitude parameter webview
    latitude = BotStarWebview('getParameter', 'latitude');

    // You have to define HTML meta "bs:input:longitude" in order to inform bot send data to buttonName parameter webview
    longitude = BotStarWebview('getParameter', 'longitude');

    direction = BotStarWebview('getParameter', 'direction');

    loadGoogleMaps(apiKey);
}

function sendResponse() {

    BotStarWebview('sendResponse', '', {}).catch((err) => {
        console.log(err);
    });
}

function loadGoogleMaps(apiKey) {
    var tag = document.createElement('script');
    tag.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function initMap() {
    var plane = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: plane,
        zoom: 8,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT,
        },
    });

    const svgMarker = {
        path:
            "M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: parseFloat(direction),
        scale: 2,
        anchor: new google.maps.Point(15, 30),
    };

    new google.maps.Marker({
        position: plane,
        map,
        icon: svgMarker,
    });
}
