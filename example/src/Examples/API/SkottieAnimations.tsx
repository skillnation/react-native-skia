import React, { useEffect, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import {
  Skia,
  SkiaView,
  useDrawCallback,
  useClockValue,
  useComputedValue,
} from "@shopify/react-native-skia";

import _LottieAnim from "../../assets/material_wave_loading.json";
const LottieAnim = JSON.stringify(_LottieAnim);

const fibonacci = (num: number) => {
  let a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
};

export const useMakeJsThreadBusy = () =>
  useEffect(() => {
    setInterval(() => {
      console.log("JS thread is busy now");
      while (true) {
        fibonacci(10000);
      }
    }, 2000);
  }, []);

export const SkottieAnimations = () => {
  const { width, height } = useWindowDimensions();

  useMakeJsThreadBusy();

  const skottieAnimation = useMemo(() => Skia.SkottieAnimation(LottieAnim), []);
  const clock = useClockValue();
  const progressValue = useComputedValue(() => {
    "worklet";
    const c = clock;
    return (c.current / (skottieAnimation.duration * 1000)) % 1;
  }, [clock]);

  const onDraw = useDrawCallback(
    (canvas) => {
      "worklet";

      const p = progressValue;
      skottieAnimation.seek(p.current);
      skottieAnimation.render(canvas, Skia.XYWHRect(0, 0, width, height));
    },
    [progressValue]
  );

  return <SkiaView style={{ width, height }} onDraw={onDraw} />;
};
