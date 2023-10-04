

// Cesiumのビューアーを初期化
const viewer = new Cesium.Viewer('cesiumContainer');

// Polylineのデータを定義
const polylineData = {
    positions: Cesium.Cartesian3.fromDegreesArray([
        // ここに緯度経度のデータを追加
    ]),
    width: 10.0
};

// Polylineをシーンに追加
const polyline = viewer.entities.add({
    polyline: polylineData
});

// 3D車のモデルをシーンに追加
const car = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(/* 初期位置 */),
    model: {
        uri: 'path/to/car.gltf'
    }
});

// 開始ボタンのクリックリスナー
document.getElementById('startButton').addEventListener('click', function() {
    // アニメーション関数をここに定義・実行
    // ...
});

// その他の設定や調整...

// アニメーションの設定
const start = Cesium.JulianDate.fromDate(new Date());
const stop = Cesium.JulianDate.addSeconds(start, polylineData.positions.length, new Cesium.JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.multiplier = 10;  // この値でアニメーションのスピードを調整できます
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;  // ループしないようにする
viewer.clock.canAnimate = false;  // アニメーションを開始時にのみ実行

const position = new Cesium.SampledPositionProperty();
for (let i = 0; i < polylineData.positions.length; i++) {
    const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
    const positionValue = polylineData.positions[i];
    position.addSample(time, positionValue);
}
car.position = position;
car.orientation = new Cesium.VelocityOrientationProperty(position);

document.getElementById('startButton').addEventListener('click', function() {
    viewer.clock.multiplier = 10;  // アニメーションのスピードを設定
    viewer.clock.canAnimate = true;  // アニメーションを開始

    // カメラの移動をアップデート
    viewer.scene.preRender.addEventListener(function(scene, time) {
        const carPosition = car.position.getValue(time);
        const offset = Cesium.Cartesian3.fromDegrees(0, 0, 100);  // 100m上空
        const cameraPosition = Cesium.Cartesian3.add(carPosition, offset, new Cesium.Cartesian3());

        viewer.camera.lookAt(carPosition, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-45), Cesium.Math.toRadians(-45), 100));
    });
});

