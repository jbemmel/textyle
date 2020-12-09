#![cfg(target_arch = "wasm32")]

extern crate tilemap;
use tilemap::tilemap::Tilemap;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_tilemap_layer_creation() {
  let mut map = Tilemap::new();

  let id1 = map.add_layer(10, 10);
  assert_eq!(id1, 0);

  let id2 = map.add_layer(5, 5);
  assert_eq!(id2, 1);
}

#[wasm_bindgen_test]
fn test_layer_operations() {
  let mut map = Tilemap::new();

  let id1 = map.add_layer(10, 10);
  map.set(3, 6, 47, id1);
  let value1 = map.get(3, 6, id1);
  assert_eq!(value1, 47);

  let id2 = map.add_layer(5, 5);
  map.set(2, 0, 22, id2);
  let value2 = map.get(2, 0, id2);
  assert_eq!(value2, 22);

  let id3 = map.add_layer(5, 5);
  map.fill(0, 0, 12, id3);
  let value2 = map.get(4, 4, id3);
  assert_eq!(value2, 12);
}
