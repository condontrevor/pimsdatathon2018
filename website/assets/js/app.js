mapboxgl.accessToken = 'pk.eyJ1IjoiY29uZG9udHJldm9yIiwiYSI6ImNqaXNkaXh2cTE0cGEzdnJxdjlyZzBjdmIifQ.V9qq253QYFASFjnKU3_dgg';

var config = {
    apiKey: "AIzaSyAXcvqYL5hvzWw8__Ryn9_TxUma9QLkymU",
    authDomain: "plus-56f92.firebaseapp.com",
    databaseURL: "https://plus-56f92.firebaseio.com",
    projectId: "plus-56f92",
    storageBucket: "plus-56f92.appspot.com",
    messagingSenderId: "781587779582"
};
firebase.initializeApp(config);

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    zoom: 9,
    center: [
        -114.09198760986328,
        51.03556511729962
    ]
});

var db = firebase.firestore();


map.on('load', function() {
    // Create a GeoJSON source
    var data = {
        "type": "FeatureCollection",
        "features": []
    };
    map.addSource('trace', { type: 'geojson', data: data });
    map.addLayer({
        "id": "trace",
        "type": "circle",
        "source": "trace",
    });

    var doc = db.collection('events');
    var observer = doc.onSnapshot(docSnapshot => {
      data = {
        "type": "FeatureCollection",
        "features": []
      };
      docSnapshot.forEach(function(c) {
        var childData = c.data();
        data.features.push(
        {
            "type": "Feature",
            "properties": {
                "marker-color": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    childData.location.longitude,
                    childData.location.latitude
                ]
            }
        }
        );
        map.getSource('trace').setData(data);
        console.log("Current data: ", data);
      });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
});
