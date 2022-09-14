#pragma once

#include <jsi/jsi.h>
#include <RNSkPlatformContext.h>

namespace RNSkia {
    using namespace facebook;

    class RNSkSkottieModuleManager {
    public:
        static void installBindings(jsi::Runtime *jsRuntime, std::shared_ptr<RNSkPlatformContext> platformContext);
    private:

        jsi::Runtime *_jsRuntime;
        std::shared_ptr<RNSkPlatformContext> platformContext;
    };
}