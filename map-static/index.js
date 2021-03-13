var latitude;
var longitude;


function onChatBotReady() {
    // You have to define HTML meta "bs:input:googlemapsKey" in order to inform bot send data to googlemapsKey parameter webview
    var apiKey = BotStarWebview('getParameter', 'googlemapsKey');

    // You have to define HTML meta "bs:input:latitude" in order to inform bot send data to latitude parameter webview
    latitude = BotStarWebview('getParameter', 'latitude');

    // You have to define HTML meta "bs:input:longitude" in order to inform bot send data to buttonName parameter webview
    longitude = BotStarWebview('getParameter', 'longitude');

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
    var DefaultPlace = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    new google.maps.Map(document.getElementById('map'), {
        center: DefaultPlace,
        zoom: 8,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT,
        },
    });
}
