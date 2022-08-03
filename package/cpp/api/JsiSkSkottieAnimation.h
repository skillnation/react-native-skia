#pragma once

#include <JsiSkHostObjects.h>

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdocumentation"

#include <modules/skottie/include/Skottie.h>
#include <SkBitmap.h>
#include <map>

#pragma clang diagnostic pop

#include <jsi/jsi.h>

// TODO: we probably also want to turn that into a factory.
namespace RNSkia {
    using namespace facebook;

    class JsiSkSkottieAnimation : public JsiSkWrappingSkPtrHostObject<skottie::Animation>
    {
    private:
        std::map<int, SkBitmap*> fBitmaps;
        int currentFrame;

    public:
        //#region Properties
        JSI_PROPERTY_GET(duration) { return static_cast<double>(getObject()->duration()); }
        JSI_PROPERTY_GET(fps) { return static_cast<double>(getObject()->fps()); }

        JSI_EXPORT_PROPERTY_GETTERS(JSI_EXPORT_PROP_GET(JsiSkSkottieAnimation, duration),
                                    JSI_EXPORT_PROP_GET(JsiSkSkottieAnimation, fps))
        //#endregion


        //#region Methods
        JSI_HOST_FUNCTION(seek) {
            auto progress = arguments[0].asNumber();
            getObject()->seek(progress);
            
            auto totalFrameCount = getObject()->duration() * getObject()->fps();
            currentFrame = totalFrameCount * progress;

            return jsi::Value::undefined();
        }

        JSI_HOST_FUNCTION(render) {
            auto canvas = JsiSkCanvas::fromValue(runtime, arguments[0]);
            auto rect = JsiSkRect::fromValue(runtime, arguments[1]);

            auto bitmap = fBitmaps[currentFrame];
            if (bitmap == nullptr) {
                // FIXME: result is blurred!
                bitmap = new SkBitmap();
                auto success = bitmap->tryAllocPixels(
                        SkImageInfo::Make(rect->width(), rect->height(),
                                          SkColorType::kRGBA_8888_SkColorType,
                                          SkAlphaType::kPremul_SkAlphaType)
                );
                if (!success) {
                    // just render the frame out regularly
                    getObject()->render(canvas, rect.get());
                    return jsi::Value::undefined();
                }

                auto _canvas = new SkCanvas(*bitmap);
                getObject()->render(_canvas, rect.get());
                bitmap->setImmutable(); // perf optimization for asImage
                fBitmaps[currentFrame] = bitmap;
            }

            canvas->drawImage(bitmap->asImage(), 0, 0);
            // TODO: check if faster/easier: canvas->getSurface()->makeImageSnapshot();

            return jsi::Value::undefined();
        }

        JSI_EXPORT_FUNCTIONS(JSI_EXPORT_FUNC(JsiSkSkottieAnimation, seek),
                             JSI_EXPORT_FUNC(JsiSkSkottieAnimation, render), )
        //#endregion

        /**
          Constructor
        */
        JsiSkSkottieAnimation(std::shared_ptr<RNSkPlatformContext> context,
                            const sk_sp<skottie::Animation> animation)
                            : JsiSkWrappingSkPtrHostObject<skottie::Animation>(std::move(context), std::move(animation)){}

        /**
          Returns the jsi object from a host object of this type
        */
        static sk_sp<skottie::Animation> fromValue(jsi::Runtime &runtime, const jsi::Value &obj) {
            return obj.asObject(runtime)
                    .asHostObject<JsiSkSkottieAnimation>(runtime)
                    ->getObject();
        }

        /**
         * Creates the function for contructing a new instance of the
         * JsiSkSkottieAnimation class.
         *
         * @param context platform context
         * @return A function for creating a new host object wrapper for the JsiSkSkottieAnimation class.
         */
        static const jsi::HostFunctionType
        createCtor(std::shared_ptr<RNSkPlatformContext> context) {
            return JSI_HOST_FUNCTION_LAMBDA {
                    auto jsonStr = arguments[0].asString(runtime).utf8(runtime);
                    auto animation = skottie::Animation::Builder()
                                        .make(jsonStr.c_str(), jsonStr.size());

                    // Return the newly constructed object
                    return jsi::Object::createFromHostObject(
                    runtime, std::make_shared<JsiSkSkottieAnimation>(std::move(context), std::move(animation)));
            };
        }
    };
}
