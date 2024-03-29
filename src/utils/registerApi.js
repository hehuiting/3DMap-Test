export const getCesiumScript = () => {
  if (!global.Cesium) {
    let cesiumPath = "/static/Cesium";
    if (cesiumPath.charAt(cesiumPath.length - 1) !== "/") {
      cesiumPath = cesiumPath + "/";
    }
    global.Cesium = {};
    global.Cesium._preloader = new Promise((resolve) => {
      global._initCesium = function () {
        resolve(global.Cesium);
        global.Cesium._preloader = null;
        global._initCesium = null;
      };

      const $link = document.createElement("link");
      $link.rel = "stylesheet";
      global.document.head.appendChild($link);
      $link.href = `${cesiumPath}Widgets/widgets.css`;

      const $script = document.createElement("script");
      global.document.head.appendChild($script);
      $script.src = `${cesiumPath}Cesium.js`;
      $script.onload = function () {
        global._initCesium();
      };
    });
    return global.Cesium._preloader;
  } else if (!global.Cesium._preloader) {
    return Promise.resolve(global.Cesium);
  } else {
    return global.Cesium._preloader;
  }
};
