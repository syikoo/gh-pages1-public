const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
});

// The globe does not need to be displayed,
// since the Photorealistic 3D Tiles include terrain
viewer.scene.globe.show = false;

// Add Photorealistic 3D Tiles
try {
  const tileset = await Cesium.createGooglePhotorealistic3DTileset();
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Error loading Photorealistic 3D Tiles tileset.
  ${error}`);
}

// Point the camera at the Googleplex
viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    -2693797.551060477,
    -4297135.517094725,
    3854700.7470414364
  ),
  orientation: new Cesium.HeadingPitchRoll(
    4.6550106925119925,
    -0.2863894863138836,
    1.3561760425773173e-7
  ),
}); 


Sandcastle.addDefaultToolbarButton("log", function () {
console.log('log');
});

const czml=[
{
  "id": "document",
  "name": "CZML Polylines",
  "version": "1.0"
},
{
  "id": "polyline-0",
  "polyline": {
    "positions": {
      "cartographicDegrees": [
        139.71927000000002,
        35.6276,
        60,
        139.71933,
        35.627750000000006,
        60,
        139.71943000000002,
        35.627970000000005,
        60,
        139.71946,
        35.62802000000001,
        60,
        139.61953000000002,
        35.52816,
        60
      ]
    }
  },
  "material": {
    "solidColor": {
      "color": {
        "rgba": [
            240,
            245,
            250,
            255
        ]
      }
    }
  },
  "width": 2
},
{
  "id": "polyline-1",
  "polyline": {
    "positions": {
      "cartographicDegrees": [
        139.73542,
        35.596410000000006,
        60,
        139.73547000000002,
        35.59653,
        60,
        139.73583000000002,
        35.596450000000004,
        60,
        139.73614,
        35.59635,
        60,
        139.63643,
        35.496270000000004,
        60
     ]
    }
  },
  "material": {
    "solidColor": {
      "color": {
        "rgba": [
            240,
            245,
            230,
            255
        ]
      }
    }
  },
  "width": 2
}
];


const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);

const uczml = 'https://syikoo.github.io/gh-pages1/tmp.czml';
const dataSourcePromise1 = Cesium.CzmlDataSource.load(uczml);
viewer.dataSources.add(dataSourcePromise1);
viewer.zoomTo(dataSourcePromise1);
