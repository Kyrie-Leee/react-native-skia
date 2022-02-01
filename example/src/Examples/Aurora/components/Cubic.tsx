import React from "react";
import type {
  AnimationValue,
  CubicBezierHandle,
  Vector,
} from "@shopify/react-native-skia";
import { Line, Paint, Circle } from "@shopify/react-native-skia";

import { bilinearInterpolate, symmetric } from "./Math";

interface CubicProps {
  mesh: AnimationValue<CubicBezierHandle[]>;
  index: number;
  colors: number[];
  size: Vector;
}

export const Cubic = ({ mesh, index, colors, size }: CubicProps) => {
  return (
    <>
      <Line
        strokeWidth={2}
        color="white"
        p1={() => mesh.value[index].c1}
        p2={() => symmetric(mesh.value[index].c1, mesh.value[index].pos)}
      />
      <Line
        strokeWidth={2}
        color="white"
        p1={() => mesh.value[index].c2}
        p2={() => symmetric(mesh.value[index].c2, mesh.value[index].pos)}
      />
      <Circle
        c={() => mesh.value[index].pos}
        r={16}
        color={() => bilinearInterpolate(colors, size, mesh.value[index].pos)}
      >
        <Paint style="stroke" strokeWidth={4} color="white" />
      </Circle>
      <Circle c={() => mesh.value[index].c1} r={10} color="white" />
      <Circle c={() => mesh.value[index].c2} r={10} color="white" />
      <Circle
        c={() => symmetric(mesh.value[index].c1, mesh.value[index].pos)}
        r={10}
        color="white"
      />
      <Circle
        c={() => symmetric(mesh.value[index].c2, mesh.value[index].pos)}
        r={10}
        color="white"
      />
    </>
  );
};