//
// Created by Hanno Gödecke on 13.09.22.
//

#pragma once

#include <jsi/jsi.h>
#include <jni.h>
#include "react-native-skia-skottie-module.h"


extern "C"
JNIEXPORT void JNICALL
Java_com_shopify_reactnative_skiaskottie_RNSkiaSkottieModule_initialize(JNIEnv *env, jclass clazz,
                                                                        jlong jsi_ptr,
                                                                        jobject context) {
    RNSkia::RNSkSkottieModuleManager::installBindings(reinterpret_cast<facebook::jsi::Runtime *>(jsi_ptr));
}