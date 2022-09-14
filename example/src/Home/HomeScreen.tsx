import React from "react";
import { NativeModules, ScrollView } from "react-native";

import { HomeScreenButton } from "./HomeScreenButton";

export const HomeScreen = () => {
  const test = NativeModules.RNSkiaSkottie.install();
  console.log({ skottie: global.SkiaApi_SkottieCtor, test });

  return (
    <ScrollView>
      <HomeScreenButton title="API" description="API examples" route="API" />
      <HomeScreenButton
        title="🧘 Breathe"
        description="Simple declarative example"
        route="Breathe"
      />
      <HomeScreenButton
        title="🏞 Filters"
        description="Simple Image Filters"
        route="Filters"
      />
      <HomeScreenButton
        title="🟣 Gooey Effect"
        description="Simple Gooey effect"
        route="Gooey"
      />
      <HomeScreenButton
        title="💡 Hue"
        description="Hue Color Selection"
        route="Hue"
      />
      <HomeScreenButton
        title="🌧 Digital Rain"
        description="Digital Rain"
        route="Matrix"
      />
      <HomeScreenButton
        title="☀️ Aurora"
        description="Aurora Design via Mesh Gradients"
        route="Aurora"
      />
      <HomeScreenButton
        title="🌈 Mesh Gradient"
        description="Mesh Gradients"
        route="Vertices"
      />
      <HomeScreenButton
        title="🪞 Glassmorphism"
        description="Glassmorphism"
        route="Glassmorphism"
      />
      <HomeScreenButton title="💳 Wallet" description="Wallet" route="Wallet" />
      <HomeScreenButton
        title="📉 Graphs"
        description="Animated graphs with Skia"
        route="Graphs"
      />
      <HomeScreenButton
        title="💚 Neumorphism"
        description="Drop Shadows"
        route="Neumorphism"
      />
      <HomeScreenButton
        title="🍏 Wallpaper"
        description="Wallpaper"
        route="Wallpaper"
      />
      <HomeScreenButton
        title="🔢 Severance"
        description="Severance"
        route="Severance"
      />
      <HomeScreenButton
        title="🎥 Animation"
        description="Animated with Skia"
        route="Animation"
      />
      <HomeScreenButton
        title="🏎 Performance"
        description="Drawing Performance Test"
        route="Performance"
      />
    </ScrollView>
  );
};
