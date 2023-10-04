//--------------------------------------------------------------
// 初期表示

let viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: true,
  animation: true,
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

//--------------------------------------------------------------
// データロード

const uczml = 'https://syikoo.github.io/gh-pages1-public/tmp.czml';
const dataSourcePromise1 = Cesium.CzmlDataSource.load(uczml);
viewer.dataSources.add(dataSourcePromise1);
viewer.zoomTo(dataSourcePromise1);

dataSourcePromise1.then(dataSource=>{
//--------------------------------------------------------------
// UI作成

//----------------------------
// プルダウンメニュー
console.log('log1');
  
// 既存のPolylineエンティティを取得
const polylineEntities = dataSource.entities.values.filter(entity => entity.polyline);


  // プルダウンメニューの作成
polylineEntities.forEach(entity => {
    const option = document.createElement('option');
    option.value = entity.id;
    option.textContent = entity.name || entity.id;  // エンティティに名前があればそれを使用、なければIDを使用
    document.getElementById('lineSelector').appendChild(option);
});

// 以前に選択されていたPolylineエンティティを保持する変数
let previousSelectedLine;
let selectedLineId;
let selectedLine;

// プルダウンメニューの選択イベントのリスニング
document.getElementById('lineSelector').addEventListener('change', function(event) {
     selectedLineId = event.target.value;
     selectedLine = dataSource.entities.getById(selectedLineId);

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
  //----------------------------
  // 左クリックイベントを追加
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function(click) {
      const pickedObject = viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.polyline) {
          const selectedEntity = pickedObject.id;

          // クリックされたPolylineの中心位置を取得 (ここでは簡単のためPolylineの最初の点を使用)
          const centerPosition = selectedEntity.polyline.positions.getValue()[0];

          // クリックされたPolylineに関する情報やバルーンを表示
          dataSource.entities.add({
              position: centerPosition,
              label: {
                  text: 'クリックされたPolyline!',
                  fillColor: Cesium.Color.WHITE,
                  outlineColor: Cesium.Color.BLACK,
                  outlineWidth: 2,
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
              }
          });
      }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  //--------------------------------------------------------------
  // アニメーションの設定

  function startAnimation() {

    const car = viewer.entities.add({
      name: "Blue box",
      position: viewer.scene.camera.position,
      box: {
        dimensions: new Cesium.Cartesian3(10.0, 10.0, 10.0),
        material: Cesium.Color.BLUE,
      },
    });  
  
    const polylineData = selectedLine.polyline;
    const start = Cesium.JulianDate.fromDate(new Date());
    const stop = Cesium.JulianDate.addSeconds(start, polylineData.positions._value.length, new Cesium.JulianDate());
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.multiplier = 10;  // この値でアニメーションのスピードを調整できます
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;  // ループしないようにする
    viewer.clock.canAnimate = false;  // アニメーションを開始時にのみ実行

    const position = new Cesium.SampledPositionProperty();
    for (let i = 0; i < polylineData.positions._value.length; i++) {
        const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
        const positionValue = polylineData.positions._value[i];
      position.addSample(time, positionValue);
    }
    car.position = position;
    car.orientation = new Cesium.VelocityOrientationProperty(position);
    
    viewer.clock.multiplier = 7;  // アニメーションのスピードを設定
    viewer.clock.canAnimate = true;  // アニメーションを開始

    // カメラの移動をアップデート
    viewer.scene.preRender.addEventListener(function(scene, time) {
      try {
        let carPosition = car.position.getValue(time);
       /*
        const nextTime = Cesium.JulianDate.addSeconds(time, 5, new Cesium.JulianDate());
        let nextCarPosition = car.position.getValue(nextTime);
        const direction = Cesium.Cartesian3.subtract(nextCarPosition, carPosition, new Cesium.Cartesian3());
       */
        const offset = Cesium.Cartesian3.fromDegrees(0, 0, 400);  // 200m上空
        const cameraPosition = Cesium.Cartesian3.add(carPosition, offset, new Cesium.Cartesian3());
        viewer.camera.lookAt(carPosition, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(180), Cesium.Math.toRadians(-20), 500));
      }
      catch(err){
      }
    });
  }
  
  
document.getElementById("startAnimation").addEventListener('click', function () {
  console.log('log start');
  startAnimation();
});
document.getElementById('stopAnimation').addEventListener('click', function() {
    viewer.clock.shouldAnimate = false;  // アニメーションを停止
});
document.getElementById("logButton").addEventListener('click', function () {
  console.log('log');
  console.log(viewer);
});

});
