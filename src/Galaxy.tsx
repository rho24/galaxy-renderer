import { OrbitControls, Point, PointMaterial, Points } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";

type HygData = {
  id: number;
  hip: number;
  hd: number | null;
  hr: number | null;
  gl: number | null;
  bf: number | null;
  proper: StaticRange | null;
  ra: number;
  dec: number;
  dist: number;
  pmra: number;
  pmdec: number;
  rv: number;
  mag: number;
  absmag: number;
  spect: string;
  ci: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rarad: number;
  decrad: number;
  pmrarad: number;
  pmdecrad: number;
  bayer: number | null;
  flam: number | null;
  con: string | null;
  comp: number;
  comp_primary: number;
  base: number | null;
  lum: number;
  var: number | null;
  var_min: number | null;
  var_max: number | null;
};

let data: HygData[] = [];

const Galaxy = () => {
  const [data, setData] = useState<HygData[]>([]);

  useEffect(() => {
    Papa.parse<HygData>(new URL("hygdata_v3.csv", window.location.href).href, {
      download: true,
      worker: true,
      header: true,
      dynamicTyping: true,
      preview: 1000,
      complete: function (results) {
        setData(results.data);
      },
      error: (e: any) => {
        console.error("Error parsing csv", e);
      },
    });
  }, []);

  const d = useMemo(
    () => data.map(({ id, x, y, z }) => ({ id, x, y, z })),
    [data]
  );

  console.log("d", d);

  return (
    <Canvas style={{ background: "#000" }}>
      <OrbitControls />

      <Points>
        {d.map(({ id, x, y, z }) => (
          <Star key={id} position={[x, y, z]} />
        ))}
        <PointMaterial
          color="#fff"
          transparent
          size={0.2}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </Points>
    </Canvas>
  );
};

const Star = ({ position }: any) => {
  return <Point position={position} />;
};

export default Galaxy;
