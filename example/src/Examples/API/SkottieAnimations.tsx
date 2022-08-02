import React, { useEffect, useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import {
  Canvas,
  Skia,
  SkottieAnimation,
  useTiming,
  Easing,
} from "@shopify/react-native-skia";

import _LottieAnim from "../../assets/trophy_anim.json";

const LottieAnim = JSON.stringify(_LottieAnim);

export const SkottieAnimations = () => {
  const { width, height } = useWindowDimensions();
  const [isRender, setIsRender] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRender(true);
    }, 4000);
  }, []);

  // TODO: build a hook that abstracts this logic
  const skottieAnimation = useMemo(() => Skia.SkottieAnimation(LottieAnim), []);

  const progress = useTiming(
    {
      from: 0,
      to: 1,
      loop: true,
    },
    {
      duration: skottieAnimation.duration * 1000,
      easing: Easing.linear,
    }
  );

  return (
    <View>
      {isRender && (
        <Canvas style={{ width, height }}>
          <SkottieAnimation
            x={0}
            y={0}
            width={width}
            height={height}
            progress={progress}
            anim={skottieAnimation}
          />
        </Canvas>
      )}
    </View>
  );
};
