#include "react-native-skia-skottie-module.h"

#include <utility>
#include "JsiSkSkottie.h"

namespace RNSkia {
    using namespace facebook;

    void RNSkSkottieModuleManager::installBindings(
            jsi::Runtime *jsRuntime
    ) {
        // Install bindings
        auto createSkottie = JsiSkSkottie::createCtor();
        jsRuntime->global().setProperty(
                *jsRuntime, "SkiaApi_SkottieCtor",
                jsi::Function::createFromHostFunction(
                        *jsRuntime,
                        jsi::PropNameID::forAscii(*jsRuntime, "SkottieCtor"),
                        1,
                        createSkottie
                )
        );
    }
}