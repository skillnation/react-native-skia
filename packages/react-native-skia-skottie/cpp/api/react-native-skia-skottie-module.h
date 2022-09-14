#pragma once

#include "../../../node_modules/react-native/ReactCommon/jsi/jsi/jsi.h"

namespace RNSkia {
    using namespace facebook;

    class RNSkSkottieModuleManager {
    public:
        static void installBindings(jsi::Runtime *jsRuntime);
    private:

        jsi::Runtime *_jsRuntime;
    };
}