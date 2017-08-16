import { $ } from '../page/el';
import { Viewer3D } from '../third-party/viewer3D';
import { crystalLogoEl as logo } from '../env/error';

// (c) Crystal Lang, licensed under the Apache License 2.0
const LOGO_PATH =
  'https://cdn.rawgit.com/crystal-lang/crystal-website/unstable/xml/polyhedron/icosahedron.xml';

const make = (): void => {
  const model = new Viewer3D(<HTMLCanvasElement>$(logo));
  model.setShader();
  model.insertModel(LOGO_PATH);
  model.setContrast(0.9);
};

export { make };
