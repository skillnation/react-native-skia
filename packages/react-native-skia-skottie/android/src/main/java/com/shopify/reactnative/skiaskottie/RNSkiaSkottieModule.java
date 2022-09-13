package com.shopify.reactnative.skiaskottie;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.lang.ref.WeakReference;

@ReactModule(name = "RNSkiaSkottie")
public class RNSkiaSkottieModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RNSkiaSkottie";

    private final WeakReference<ReactApplicationContext> weakReactContext;
    // private SkiaManager skiaManager;

    public RNSkiaSkottieModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.weakReactContext = new WeakReference<>(reactContext);
//        reactContext.addLifecycleEventListener(this);
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
            // skiaManager = new SkiaManager(context);
            return true;
        } catch (Exception exception) {
            Log.e(NAME, "Failed to initialize Skia Manager!", exception);
            return false;
        }
    }
}
