// 1. Set up CesiumJS viewer with OpenStreetMap imagery
const viewer = new Cesium.Viewer('cesiumContainer');
/*
const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: 
      new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/',
        credit: 'OSM'
      }),
    baseLayerPicker: false
});
*/

const airports = {
    "Hartsfield-Jackson": {
        location: [33.6407, -84.4277],
        code: "ATL",
        long_name: "Hartsfield-Jackson Atlanta International Airport"
    },
    "Beijing Capital": {
        location: [40.0801, 116.5844],
        code: "PEK",
        long_name: "Beijing Capital International Airport"
    },
    "LAX": {
        location: [33.9425, -118.4081],
        code: "LAX",
        long_name: "Los Angeles International Airport"
    },
    "Dubai": {
        location: [25.2532, 55.3657],
        code: "DXB",
        long_name: "Dubai International Airport"
    },
    "Tokyo Haneda": {
        location: [35.5494, 139.7798],
        code: "HND",
        long_name: "Tokyo International Airport (Haneda)"
    },
    "O'Hare": {
        location: [41.9742, -87.9073],
        code: "ORD",
        long_name: "O'Hare International Airport"
    },
    "Heathrow": {
        location: [51.4700, -0.4543],
        code: "LHR",
        long_name: "London Heathrow Airport"
    },
    "Shanghai Pudong": {
        location: [31.1443, 121.8083],
        code: "PVG",
        long_name: "Shanghai Pudong International Airport"
    },
    "Charles de Gaulle": {
        location: [49.0097, 2.5479],
        code: "CDG",
        long_name: "Charles de Gaulle Airport"
    },
    "Dallas/Fort Worth": {
        location: [32.8998, -97.0403],
        code: "DFW",
        long_name: "Dallas/Fort Worth International Airport"
    },
    "Guangzhou Baiyun": {
        location: [23.3959, 113.3080],
        code: "CAN",
        long_name: "Guangzhou Baiyun International Airport"
    },
    "Amsterdam Schiphol": {
        location: [52.3105, 4.7683],
        code: "AMS",
        long_name: "Amsterdam Airport Schiphol"
    },
    "Hong Kong": {
        location: [22.3080, 113.9185],
        code: "HKG",
        long_name: "Hong Kong International Airport"
    },
    "Frankfurt": {
        location: [50.0379, 8.5622],
        code: "FRA",
        long_name: "Frankfurt Airport"
    },
    "Indira Gandhi": {
        location: [28.5562, 77.1000],
        code: "DEL",
        long_name: "Indira Gandhi International Airport"
    },
    "Singapore Changi": {
        location: [1.3644, 103.9915],
        code: "SIN",
        long_name: "Singapore Changi Airport"
    },
    "Seoul Incheon": {
        location: [37.4602, 126.4407],
        code: "ICN",
        long_name: "Incheon International Airport"
    },
    "Denver": {
        location: [39.8561, -104.6737],
        code: "DEN",
        long_name: "Denver International Airport"
    },
    "Bangkok Suvarnabhumi": {
        location: [13.6904, 100.7501],
        code: "BKK",
        long_name: "Suvarnabhumi Airport"
    },
    "Kuala Lumpur": {
        location: [2.7456, 101.7099],
        code: "KUL",
        long_name: "Kuala Lumpur International Airport"
    },
    "Sheremetyevo": {
        location: [55.9726, 37.4146],
        code: "SVO",
        long_name: "Sheremetyevo International Airport"
    },
    "Toronto Pearson": {
        location: [43.6777, -79.6248],
        code: "YYZ",
        long_name: "Toronto Pearson International Airport"
    },
    "Vancouver": {
        location: [49.1967, -123.1815],
        code: "YVR",
        long_name: "Vancouver International Airport"
    },
    "Sydney": {
        location: [-33.9399, 151.1753],
        code: "SYD",
        long_name: "Sydney Kingsford Smith Airport"
    },
    "São Paulo/Guarulhos": {
        location: [-23.4356, -46.4731],
        code: "GRU",
        long_name: "São Paulo/Guarulhos–Governador André Franco Montoro International Airport"
    },
    "Johannesburg OR Tambo": {
        location: [-26.1392, 28.2460],
        code: "JNB",
        long_name: "O. R. Tambo International Airport"
    },
    "Auckland": {
        location: [-37.0082, 174.7917],
        code: "AKL",
        long_name: "Auckland Airport"
    },
    "Buenos Aires Ezeiza": {
        location: [-34.8222, -58.5358],
        code: "EZE",
        long_name: "Ministro Pistarini International Airport"
    },
    "Moscow Domodedovo": {
        location: [55.4103, 37.9023],
        code: "DME",
        long_name: "Moscow Domodedovo Airport"
    },
    "Montreal Trudeau": {
        location: [45.4675, -73.7418],
        code: "YUL",
        long_name: "Montréal–Pierre Elliott Trudeau International Airport"
    },
    "Melbourne": {
        location: [-37.6733, 144.8433],
        code: "MEL",
        long_name: "Melbourne Airport"
    },
    "Brisbane": {
        location: [-27.3842, 153.1175],
        code: "BNE",
        long_name: "Brisbane Airport"
    },
    "Rio de Janeiro/Galeão": {
        location: [-22.8090, -43.2506],
        code: "GIG",
        long_name: "Rio de Janeiro/Galeão–Antonio Carlos Jobim International Airport"
    },
    "Santiago": {
        location: [-33.3930, -70.7858],
        code: "SCL",
        long_name: "Comodoro Arturo Merino Benítez International Airport"
    },
    "Lima": {
        location: [-12.0219, -77.1143],
        code: "LIM",
        long_name: "Jorge Chávez International Airport"
    },
    "Cape Town": {
        location: [-33.9648, 18.6017],
        code: "CPT",
        long_name: "Cape Town International Airport"
    },
    "Perth": {
        location: [-31.9403, 115.9669],
        code: "PER",
        long_name: "Perth Airport"
    },
    "Bogotá": {
        location: [4.7016, -74.1469],
        code: "BOG",
        long_name: "El Dorado Luis Carlos Galán Sarmiento International Airport"
    },
    "Belo Horizonte/Confins": {
        location: [-19.6244, -43.9719],
        code: "CNF",
        long_name: "Tancredo Neves/Confins International Airport"
    },
    "Quito": {
        location: [-0.1292, -78.3575],
        code: "UIO",
        long_name: "Mariscal Sucre International Airport"
    }
};
const pinBuilder = new Cesium.PinBuilder();

for (let airportName in airports) {
    const airport = airports[airportName];
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(airport.location[1], airport.location[0]),
        billboard: {
            image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 24).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        label: {
            text: airportName,
　          font: '10px sans-serif', 
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            pixelOffset: new Cesium.Cartesian2(0, 2)  // アイコンの上にラベルを表示
        }
    });
}

// 3. Define routes for each vehicle
const start = Cesium.Cartesian3.fromDegrees(130.0, 46.0);
const end = Cesium.Cartesian3.fromDegrees(-90.0, 40.0);
const timeStart = Cesium.JulianDate.fromDate(new Date());
const timeEnd = Cesium.JulianDate.addHours(timeStart, 2, new Cesium.JulianDate());

viewer.entities.add({
    polyline: {
        positions: [start, end],
        width: 2,
        material: Cesium.Color.RED
    }
});

// 2. Add vehicle-like 2D objects (billboards)
const icon="https://img.icons8.com/ios-glyphs/30/airplane-mode-on.png";
const vehicles = viewer.entities.add(new Cesium.Entity({
    position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0),
    billboard: {
        image: icon, // Replace with your vehicle icon path
        scale: 0.5,
        verticalOrigin: Cesium.VerticalOrigin.TOP  // この行を追加
    }
}));


// 4. Animate the vehicles along their routes
const sampledPosition = new Cesium.SampledPositionProperty();
sampledPosition.addSample(timeStart, start);
sampledPosition.addSample(timeEnd, end);
vehicles.position = sampledPosition;

// Rotate the vehicle towards its destination
const heading = Cesium.Math.toRadians(Cesium.Cartesian3.angleBetween(start, end));
vehicles.orientation = Cesium.Transforms.headingPitchRollQuaternion(start, new Cesium.HeadingPitchRoll(heading, 0, 0));

// Set the viewer's clock to the timeline of the animation
viewer.clock.startTime = timeStart.clone();
viewer.clock.stopTime = timeEnd.clone();
viewer.clock.currentTime = timeStart.clone();
viewer.clock.multiplier = 10; // Speed up the animation
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
viewer.timeline.zoomTo(timeStart, timeEnd);
