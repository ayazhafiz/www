import { Viewer3D } from '../third-party/viewer3D';

/**
 * XML definition of the crystal logo
 * (c) Crystal Lang, licensed under the Apache License 2.0
 * @constant
 */
const LOGO_PATH =
  'https://cdn.rawgit.com/crystal-lang/crystal-website/' +
  '62baf9411714ede982ded0f992f6f3ec37a17165/xml/polyhedron/icosahedron.xml';

/**
 * Renders the Crystal logo on a canvas
 * @function
 */
const renderCrystalLogo = (element: HTMLCanvasElement): void => {
  const model = new Viewer3D(element);
  model.shader('flat', 255, 255, 255);
  model.contrast(0.9);
  model.insertModel(LOGO_PATH);
};

export { renderCrystalLogo };
