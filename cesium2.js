
//--------------------------------------------------------------
// 初期表示

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

//--------------------------------------------------------------
// データロード

const uczml = 'https://syikoo.github.io/gh-pages1/tmp.czml';
const dataSourcePromise1 = Cesium.CzmlDataSource.load(uczml);
viewer.dataSources.add(dataSourcePromise1);
viewer.zoomTo(dataSourcePromise1);

//--------------------------------------------------------------
// UI作成

//----------------------------
// プルダウンメニュー

// 既存のPolylineエンティティを取得
const polylineEntities = viewer.entities.values.filter(entity => entity.polyline);

// プルダウンメニューの作成
polylineEntities.forEach(entity => {
    const option = document.createElement('option');
    option.value = entity.id;
    option.textContent = entity.name || entity.id;  // エンティティに名前があればそれを使用、なければIDを使用
    document.getElementById('lineSelector').appendChild(option);
});

// 以前に選択されていたPolylineエンティティを保持する変数
let previousSelectedLine;

// プルダウンメニューの選択イベントのリスニング
document.getElementById('lineSelector').addEventListener('change', function(event) {
    const selectedLineId = event.target.value;
    const selectedLine = viewer.entities.getById(selectedLineId);

    // 以前に選択されていたPolylineの強調表示を解除
    if (previousSelectedLine) {
        previousSelectedLine.polyline.material = Cesium.Color.WHITE;
        previousSelectedLine.polyline.width = 2;
        // 開始点・終了点の強調表示を解除する処理もここに追加...
    }

    // 新しく選択されたPolylineを強調表示
    selectedLine.polyline.material = Cesium.Color.RED;
    selectedLine.polyline.width = 5;
    // 開始点・終了点の強調表示の処理もここに追加...

    // 選択されたPolylineをpreviousSelectedLineとして保持
    previousSelectedLine = selectedLine;
});

