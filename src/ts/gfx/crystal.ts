import { $ } from '../util/el';
import { Viewer3D } from '../third-party/viewer3D';

/**
 * XML definition of the crystal logo
 * (c) Crystal Lang, licensed under the Apache License 2.0
 * @constant
 */
const LOGO_PATH =
  'https://cdn.rawgit.com/crystal-lang/crystal-website/' +
  'unstable/xml/polyhedron/icosahedron.xml';

/**
 * Loads the Crystal logo on an arbitrary element model
 * @function
 */
const loadCrystalLogo = (element: HTMLCanvasElement): void => {
  const model = new Viewer3D(element);
  model.setShader();
  model.insertModel(LOGO_PATH);
  model.setContrast(0.9);
};

export { loadCrystalLogo };
