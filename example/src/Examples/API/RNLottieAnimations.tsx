import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";

import _LottieAnim from "../../assets/trophy_anim.json";

export const RNLottieAnimations = () => {
  const { width, height } = useWindowDimensions();
  const [isRender, setIsRender] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRender(true);
    }, 4000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isRender && (
        <AnimatedLottieView
          // anim config
          loop={true}
          autoPlay={true}
          source={_LottieAnim}
          // optimization
          cacheComposition={true}
          enableMergePathsAndroidForKitKatAndAbove={true}
          // style
          // resizeMode={"contain"}
          // style={{ width, height, position: "absolute",}}
        />
      )}
    </View>
  );
};
