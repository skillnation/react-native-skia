package com.shopify.reactnative.skiaskottie;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.lang.ref.WeakReference;
import java.lang.reflect.Method;

@ReactModule(name = "RNSkiaSkottie")
public class RNSkiaSkottieModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RNSkiaSkottie";

    private final WeakReference<ReactApplicationContext> weakReactContext;

    public RNSkiaSkottieModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.weakReactContext = new WeakReference<>(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean install() {
        try {
            System.loadLibrary("reactskiaskottie");
            ReactApplicationContext context = weakReactContext.get();
            if (context == null) {
                Log.e(NAME, "React Application Context was null!");
                return false;
            }

            Class<ReactContextBaseJavaModule> rnSkiaModule = (Class<ReactContextBaseJavaModule>) Class.forName("com.shopify.reactnative.skia.RNSkiaModule");
            ReactContextBaseJavaModule module = context.getNativeModule(rnSkiaModule);
            if (module == null) {
                Log.e(NAME, "react-native-skia-skottie: Skia Module instance not found. Make sure to import skia first!");
                return false;
            }
            Method getSkiaManager = rnSkiaModule.getDeclaredMethod("getSkiaManager");
            Object skiaManagerObj = getSkiaManager.invoke(module);
            if (skiaManagerObj == null) {
                Log.e(NAME, "react-native-skia-skottie: Skia Manager instance not found. Make sure to import skia first!");
                return false;
            }
            // if we got this far, this class will exist
            Class skiaManager = Class.forName("com.shopify.reactnative.skia.SkiaManager");
            Method getPlatformContext = skiaManager.getDeclaredMethod("getPlatformContext");
            Object platformContext = getPlatformContext.invoke(skiaManagerObj);
            if (platformContext == null) {
                Log.e(NAME, "react-native-skia-skottie: Skia Manager's platform context instance was null. Make sure to import skia first!");
                return false;
            }

            Log.d(NAME, "Found and everything works, nice!");

            initialize(context.getJavaScriptContextHolder().get(), context);
            return true;
        } catch (Exception exception) {
            Log.e(NAME, "Failed to initialize Skia Skottie!", exception);
            return false;
        }
    }

    public static native void initialize(long jsiPtr, ReactContext context);
}
