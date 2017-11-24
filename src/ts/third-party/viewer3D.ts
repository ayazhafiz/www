// (c) Crystal Lang, licensed under the Apache License 2.0
// Rewritten to ES6/TypeScript by Ayaz Hafiz (hafiz)
// @nodoc
interface Vector {
  x: number;
  y: number;
  z: number;
}

interface Transform {
  normal: Vector;
  centroid: Vector;
}

interface Face {
  vertices: Array<number>;
  centroid: Vector;
  transform: Transform;
}

type Matrix = Array<Float32Array | Uint8ClampedArray>;

class FlatShader {
  private readonly light: Light;

  constructor() {
    this.light = new Light(-5, -5, 20, 140, 140, 140);
  }

  private static readonly applyContrast = (
    channel: number,
    contrast: number
  ): number =>
    (contrast > 0
      ? (channel / 255 - 0.5) / (1 - contrast) + 0.5
      : (channel / 255 - 0.5) * (1 + contrast) + 0.5) * 255;

  private readonly fill = (face: Face, viewer): string => {
    const cos =
      face.transform.normal.x * this.light.x +
      face.transform.normal.y * this.light.y +
      face.transform.normal.z * this.light.z;
    const r = Math.max(
      0,
      Math.min(
        255,
        Math.round(
          FlatShader.applyContrast(cos * this.light.r, viewer.contrast)
        )
      )
    );
    const g = Math.max(
      0,
      Math.min(
        255,
        Math.round(
          FlatShader.applyContrast(cos * this.light.g, viewer.contrast)
        )
      )
    );
    const b = Math.max(
      0,
      Math.min(
        255,
        Math.round(
          FlatShader.applyContrast(cos * this.light.b, viewer.contrast)
        )
      )
    );

    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substring(1);
  };

  readonly render = (viewer): void => {
    const order = viewer.sortByNormal();
    for (let step of <any>order) {
      const face = viewer.faces[step];
      if (face.transform.normal.z > 0) {
        const color = this.fill(face, viewer);
        viewer.canvas.strokeStyle = color;
        viewer.canvas.fillStyle = color;
        viewer.canvas.lineWidth = 0.5;
        viewer.canvas.beginPath();
        for (let j = 0; j < face.vertices.length; ++j) {
          const vertex = viewer.vertices[face.vertices[j]];
          if (!j) {
            viewer.canvas.moveTo(vertex.screenX, vertex.screenY);
          }
          viewer.canvas.lineTo(vertex.screenX, vertex.screenY);
        }
        viewer.canvas.closePath();
        viewer.canvas.fill();
        viewer.canvas.stroke();
      }
    }
  };
}

class Light {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly r: number;
  readonly g: number;
  readonly b: number;
  constructor(
    x: number,
    y: number,
    z: number,
    r: number,
    g: number,
    b: number
  ) {
    const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    this.x = x / length;
    this.y = y / length;
    this.z = z / length;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

function Viewer3D(container: HTMLCanvasElement): void {
  let self = this;
  self.container = container;
  self.width = self.container.width;
  self.height = self.container.height;

  self.vertices;
  self.faces;
  self.last;
  self.canvas;
  self.shader;
  self.req;
  self.renderInterval;
  self.dragging;
  self.min = 0.01;
  self.yaw = self.min;
  self.pitch = self.min;
  self.distance = 4;
  self.scale = self.width * (4 / 3);
  self.rmat = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  self.loaded = false;
  self.start;
  self.contrast = 0;

  self.insertModel = (url: string): void => {
    window.clearInterval(self.renderInterval);
    self.renderInterval = undefined;
    self.container.addEventListener('mousedown', mouseDownHandler, false);
    self.canvas = self.container.getContext('2d');
    fetchXML(url);
  };

  self.setShader = (): void => {
    self.shader = new FlatShader();
  };

  self.setContrast = (value: number): number => {
    if (value === null) {
      return self.contrast;
    }
    self.contrast = Math.max(-1, Math.min(1, value));
  };

  self.sortByNormal = (): Uint8ClampedArray => {
    return new Uint8ClampedArray(
      Array.from(new Array(this.faces.length), (n, i) => i).sort((a, b) => {
        const deltaNormal =
          this.faces[b].transform.normal.z - this.faces[a].transform.normal.z;
        if (deltaNormal === 0) return 0;
        return deltaNormal < 0 ? 1 : -1;
      })
    );
  };

  const rotate = (point3D: Vector): Vector => {
    const x =
      point3D.x * self.rmat[0][0] +
      point3D.y * self.rmat[0][1] +
      point3D.z * self.rmat[0][2];
    const y =
      point3D.x * self.rmat[1][0] +
      point3D.y * self.rmat[1][1] +
      point3D.z * self.rmat[1][2];
    const z =
      point3D.x * self.rmat[2][0] +
      point3D.y * self.rmat[2][1] +
      point3D.z * self.rmat[2][2];
    return <Vector>{ x: x, y: y, z: z };
  };

  const matrixMultiply = (a: Matrix, b: Matrix): Matrix => {
    return [
      new Float32Array([0, 0, 0]),
      new Float32Array([0, 0, 0]),
      new Float32Array([0, 0, 0])
    ].map((o, i) =>
      o.map((v, j) => [0, 1, 2].reduce((sum, k) => sum + a[i][k] * b[k][j], 0))
    );
  };

  const transformVertices = (): void => {
    for (let vertex of self.vertices) {
      const xp =
        vertex.x * self.rmat[0][0] +
        vertex.y * self.rmat[0][1] +
        vertex.z * self.rmat[0][2];
      const yp =
        vertex.x * self.rmat[1][0] +
        vertex.y * self.rmat[1][1] +
        vertex.z * self.rmat[1][2];
      const zp =
        vertex.x * self.rmat[2][0] +
        vertex.y * self.rmat[2][1] +
        vertex.z * self.rmat[2][2];
      vertex.screenX = self.width / 2 + self.scale * xp / (self.distance - zp);
      vertex.screenY = self.height / 2 + self.scale * yp / (self.distance - zp);
    }
  };

  const render = (): void => {
    self.canvas.clearRect(0, 0, self.width, self.height);
    transformVertices();
    rotateVectors();
    self.shader.render(this);
  };

  const rotateVectors = (): void => {
    for (let face of self.faces) {
      face.transform = <Transform>{
        normal: rotate(face.normal),
        centroid: rotate(face.centroid)
      };
    }
  };

  const computeCentroid = (face: Face): Vector => {
    const centroid = <Vector>{ x: 0, y: 0, z: 0 };
    for (let vertex of face.vertices.map(id => self.vertices[id])) {
      centroid.x += vertex.x;
      centroid.y += vertex.y;
      centroid.z += vertex.z;
    }
    centroid.x /= face.vertices.length;
    centroid.y /= face.vertices.length;
    centroid.z /= face.vertices.length;
    return centroid;
  };

  const computeCentroids = (): void =>
    self.faces.forEach(face => (face.centroid = computeCentroid(face)));

  const computeNormal = (face: Face): Vector => {
    const vertex0 = self.vertices[face.vertices[0]];
    const vertex1 = self.vertices[face.vertices[1]];
    const vertex2 = self.vertices[face.vertices[2]];
    const a = <Vector>{
      x: vertex1.x - vertex0.x,
      y: vertex1.y - vertex0.y,
      z: vertex1.z - vertex0.z
    };
    const b = <Vector>{
      x: vertex2.x - vertex0.x,
      y: vertex2.y - vertex0.y,
      z: vertex2.z - vertex0.z
    };
    const normal = <Vector>{
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    };
    const magnitude = Math.sqrt(
      normal.x * normal.x + normal.y * normal.y + normal.z * normal.z
    );
    normal.x /= magnitude;
    normal.y /= magnitude;
    normal.z /= magnitude;
    if (
      normal.x * face.centroid.x +
        normal.y * face.centroid.y +
        normal.z * face.centroid.z <
      0
    ) {
      normal.x = -normal.x;
      normal.y = -normal.y;
      normal.z = -normal.z;
    }
    return normal;
  };

  const computeNormals = (): void =>
    self.faces.forEach(face => (face.normal = computeNormal(face)));

  const animate = (): void => {
    self.rmat = matrixMultiply(
      [
        new Uint8ClampedArray([1, 0, 0]),
        new Float32Array([0, Math.cos(self.pitch), -Math.sin(self.pitch)]),
        new Float32Array([0, Math.sin(self.pitch), Math.cos(self.pitch)])
      ],
      matrixMultiply(
        [
          new Float32Array([Math.cos(self.yaw), 0, -Math.sin(self.yaw)]),
          new Uint8ClampedArray([0, 1, 0]),
          new Float32Array([Math.sin(self.yaw), 0, Math.cos(self.yaw)])
        ],
        self.rmat
      )
    );
    render();
    if (self.dragging) {
      self.yaw = self.pitch = 0;
    } else {
      const restart = self.pitch === 0 && self.yaw === 0;
      self.yaw = decelerate(self.yaw, restart);
      self.pitch = decelerate(self.pitch, restart);
    }
    if (self.renderInterval === undefined) {
      self.renderInterval = window.setInterval(animate, 20);
    }
  };

  const decelerate = (value: number, restart: boolean): number => {
    if (restart) {
      return 1e-4 * (Math.round(Math.random()) ? 1 : -1);
    } else if (Math.abs(value) < self.min) {
      return value * 1.01;
    } else {
      value *= 0.99;
      if (value < 0) {
        return Math.min(value, -self.min);
      } else {
        return Math.max(value, self.min);
      }
    }
  };

  const fetchXML = (url: string): void => {
    self.req = getXMLRequestObject();
    self.req.onreadystatechange = function() {
      loadGeometry();
    };
    self.req.open('GET', url, true);
    self.req.send('');
  };

  const loadGeometry = (): void => {
    if (self.req.readyState === 4) {
      if (self.req.status === 200) {
        const xml = self.req.responseXML;
        const vertices = xml.getElementsByTagName('p');
        self.vertices = new Array(vertices.length);
        for (let i = 0; i < vertices.length; ++i) {
          self.vertices[i] = <Vector>{
            x: Number(vertices[i].getAttribute('x')),
            y: Number(vertices[i].getAttribute('y')),
            z: Number(vertices[i].getAttribute('z'))
          };
        }
        const faces = xml.getElementsByTagName('f');
        self.faces = new Array(faces.length);
        for (let i = 0; i < faces.length; ++i) {
          self.faces[i] = { vertices: new Array() };
          for (let j = 0; j < faces[i].childNodes.length; ++j) {
            self.faces[i].vertices[j] =
              faces[i].childNodes[j].firstChild.nodeValue;
          }
        }
        computeCentroids();
        computeNormals();
        animate();
      } else {
        alert(`xml request error: ${self.req.statusText}`);
      }
    }
  };

  const getXMLRequestObject = (): XMLHttpRequest => {
    if ((<any>window).XMLHttpRequest) {
      return new (<any>window).XMLHttpRequest();
    } else if ((<any>window).ActiveXObject) {
      return new (<any>window).ActiveXObject('Microsoft.XMLHTTP');
    }
    throw new Error("Can't find XML Http Request object!");
  };

  function mouseDownHandler(event) {
    const bounds = self.container.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    self.dragging = true;
    self.last = { point: { x: x, y: y } };
    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
  }

  function mouseUpHandler(event) {
    self.dragging = false;
    window.removeEventListener('mousemove', mouseMoveHandler, false);
    window.removeEventListener('mouseup', mouseUpHandler, false);
  }

  function mouseMoveHandler(event) {
    const bounds = self.container.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const depth = self.scale / self.distance / 4;
    self.yaw =
      Math.atan2(self.last.point.x - self.width / 4, depth) -
      Math.atan2(x - self.width / 4, depth);
    self.pitch =
      Math.atan2(self.last.point.y - self.height / 4, depth) -
      Math.atan2(y - self.height / 4, depth);
    self.last = { point: { x: x, y: y } };
  }
}

export { Viewer3D };
