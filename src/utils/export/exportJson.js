import TilemapInstance from "tilemap";
import TileManagerInstance from "renderer/TileManager";
import reduxStore from "redux/store";
import { getTextureData } from "idbTextureStore";

const exportJson = async () => {
  const exportObject = {};
  exportObject["map"] = {};

  const state = reduxStore.getState();

  // If layers have not been initialized, don't try to touch them abort exporting
  if (!state.layers || !state.layers.layers) {
    console.error("There are no layers in the current project.");
    return JSON.stringify(exportObject);
  }

  // ========================
  // Layer
  // ========================
  const layerNames = state.layers.names;
  const layers = state.layers.layers;

  // JvB: Start with an empty floor layer, as required by Workadventu.re
  exportObject["map"]["layers"] = [
  {
         "draworder":"topdown",
         "id": 0,
         "name":"floorLayer",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"computer",
                 "point":true,
                 "rotation":0,
                 "type":"computer",
                 "visible":true,
                 "width":0,
                 "x":431.75,
                 "y":335.25
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
  ];

  for (const layerName of layerNames) {
    const layer = layers[layerName];
    const layerWidth = 10;
    const layerHeight = 10;
    const layerX = 0;
    const layerY = 0;
    const layerObj = {};
    layerObj["name"] = layerName;

    layerObj["width"] = TilemapInstance.layerWidth(layer.id);
    layerObj["height"] = TilemapInstance.layerHeight(layer.id);
    layerObj["x"] = TilemapInstance.layerX(layer.id);
    layerObj["y"] = TilemapInstance.layerY(layer.id);
    layerObj["data"] = [];

    for (let y = 0; y < layerHeight; y++) {
      for (let x = 0; x < layerWidth; x++) {
        const value = TilemapInstance.get(x, y, layer.id);
        layerObj["data"].push(value);
      }
    }

    exportObject["map"]["layers"].push(layerObj);
  }

  // ========================
  // Tileset
  // ========================
  const tilesetNames = state.tileset.tilesetNames;
  exportObject["tilesets"] = [];

  for (const tilesetName of tilesetNames) {
    const tilesetObj = {};

    // Tileset name
    tilesetObj["name"] = tilesetName;

    // Tile index:
    // There's an array containing all tiles from all
    // tilesets packed together. This index is where the
    // tiles from this particular tileset start.
    const data = await getTextureData(tilesetName);
    tilesetObj["tileIndex"] = data.tilesetIndex;

    exportObject["tilesets"].push(tilesetObj);
  }

  // ========================
  // Tiles
  // ========================
  exportObject["tiles"] = TileManagerInstance.tiles;

  return JSON.stringify(exportObject);
};

export default exportJson;
