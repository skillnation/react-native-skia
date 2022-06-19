import type { CanvasProps, SkiaView } from "@shopify/react-native-skia";
import { useTouchHandler, Canvas } from "@shopify/react-native-skia";
import React, { useCallback, useRef } from "react";
import { Alert, Share } from "react-native";

export const ExportablePicture = ({ children, style }: CanvasProps) => {
  const ref = useRef<SkiaView>(null);
  const onTouch = useTouchHandler({
    onEnd: () => {
      handleShare();
    },
  });
  const handleShare = useCallback(() => {
    const picture = ref.current!.getPicture();
    const data = picture.serialize()!;
    // eslint-disable-next-line no-undef
    var decoder = new TextDecoder("utf8");
    var b64encoded = btoa(decoder.decode(data));
    const url = `data:application/octet-stream;base64,${b64encoded}`;
    Share.share({
      url,
      title: "Drawing",
    }).catch(() => {
      Alert.alert("An error occurred when sharing the image.");
    });
  }, [ref]);
  return (
    <Canvas style={style} ref={ref} onTouch={onTouch}>
      {children}
    </Canvas>
  );
};
