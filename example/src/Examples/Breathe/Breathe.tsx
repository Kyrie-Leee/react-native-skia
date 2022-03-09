import React, { useEffect } from "react";
import {
  Canvas,
  Rect,
  mix,
  useValue,
  useSharedValueEffect,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const Breathe = () => {
  const x = useValue(0);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, [progress]);

  useSharedValueEffect([progress], () => {
    x.current = mix(progress.value, 0, 400);
  });
  return (
    <Canvas style={{ flex: 1 }}>
      <Rect x={x} y={100} width={10} height={10} color="red" />
    </Canvas>
  );
};
