import React, { useEffect, useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import {
  Canvas,
  Skia,
  SkottieAnimation,
  useTiming,
  Easing,
} from "@shopify/react-native-skia";

import _TrophyAnim from "../../assets/trophy_anim.json";
import _MobileAnim from "../../assets/114273-mobile.json";
import _BicycleAnim from "../../assets/1735-animated-indonesian-first-president.json";

const TrophyAnim = JSON.stringify(_TrophyAnim);
const MobileAnim = JSON.stringify(_MobileAnim);
const BicycleAnim = JSON.stringify(_BicycleAnim);

export const SkottieAnimations = () => {
  const { width, height } = useWindowDimensions();
  const [isRender, setIsRender] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRender(true);
    }, 4000);
  }, []);

  // TODO: build a hook that abstracts this logic
  const trophyAnim = useMemo(() => Skia.SkottieAnimation(TrophyAnim), []);
  const mobileAnim = useMemo(() => Skia.SkottieAnimation(MobileAnim), []);
  const bicycleAnim = useMemo(() => Skia.SkottieAnimation(BicycleAnim), []);

  const progressTrophy = useTiming(
    {
      from: 0,
      to: 1,
      loop: true,
    },
    {
      duration: trophyAnim.duration * 1000,
      easing: Easing.linear,
    }
  );
  // const progressMobile = useTiming(
  //   {
  //     from: 0,
  //     to: 1,
  //     loop: true,
  //   },
  //   {
  //     duration: mobileAnim.duration * 1000,
  //     easing: Easing.linear,
  //   }
  // );
  // const progressBicycle = useTiming(
  //   {
  //     from: 0,
  //     to: 1,
  //     loop: true,
  //   },
  //   {
  //     duration: bicycleAnim.duration * 1000,
  //     easing: Easing.linear,
  //   }
  // );

  return (
    <View>
      {/*{isRender && (*/}
      <Canvas style={{ width, height }} debug={true}>
        {/*<SkottieAnimation*/}
        {/*  x={0}*/}
        {/*  y={0}*/}
        {/*  width={width}*/}
        {/*  height={height}*/}
        {/*  progress={progressTrophy}*/}
        {/*  anim={trophyAnim}*/}
        {/*/>*/}
        {/*<SkottieAnimation*/}
        {/*  x={0}*/}
        {/*  y={0}*/}
        {/*  width={width}*/}
        {/*  height={height}*/}
        {/*  progress={progressBicycle}*/}
        {/*  anim={bicycleAnim}*/}
        {/*/>*/}
        {/*<SkottieAnimation*/}
        {/*  x={0}*/}
        {/*  y={0}*/}
        {/*  width={width}*/}
        {/*  height={height}*/}
        {/*  progress={progressMobile}*/}
        {/*  anim={mobileAnim}*/}
        {/*/>*/}
      </Canvas>
      {/*)}*/}
    </View>
  );
};
