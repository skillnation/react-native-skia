import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";

import TrophyAnim from "../../assets/trophy_anim.json";
import MobileAnim from "../../assets/114273-mobile.json";
import BicycleAnim from "../../assets/1735-animated-indonesian-first-president.json";

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
        <>
          <AnimatedLottieView
            // anim config
            loop={true}
            autoPlay={true}
            source={TrophyAnim}
            renderMode={"HARDWARE"}
            hardwareAccelerationAndroid={true}
            // optimization
            cacheComposition={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            // style
            // resizeMode={"contain"}
            // style={{ width, height, position: "absolute",}}
          />
          <AnimatedLottieView
            // anim config
            loop={true}
            autoPlay={true}
            source={MobileAnim}
            // optimization
            cacheComposition={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            // style
            // resizeMode={"contain"}
            // style={{ width, height, position: "absolute",}}
          />
          <AnimatedLottieView
            // anim config
            loop={true}
            autoPlay={true}
            source={BicycleAnim}
            // optimization
            cacheComposition={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            // style
            // resizeMode={"contain"}
            // style={{ width, height, position: "absolute",}}
          />
        </>
      )}
    </View>
  );
};
