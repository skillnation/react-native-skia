cmake_minimum_required(VERSION 3.4.1)

if(${BUILD_TYPE} STREQUAL "debug")
        set(CMAKE_BUILD_TYPE Debug)
        message("-- Building with Debug Symbols")
endif()

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DSK_GL -DSK_BUILD_FOR_ANDROID -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_HAVE_MEMRCHR=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_MOBILE=1 -DON_ANDROID -DONANDROID")

set(PACKAGE_NAME "reactskiaskottie")

set(build_DIR ${CMAKE_SOURCE_DIR}/build)
file(GLOB LIBRN_DIR "${PREBUILT_DIR}/${ANDROID_ABI}")
file(GLOB libfbjni_link_DIRS "${build_DIR}/fbjni*.aar/jni/${ANDROID_ABI}")
file(GLOB libfbjni_include_DIRS "${build_DIR}/fbjni-*-headers.jar/")

link_directories(../libs/android/${ANDROID_ABI}/)

if(${REACT_NATIVE_VERSION} LESS 66)
        file(
                TO_CMAKE_PATH
                "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi/jsi/jsi.cpp"
                INCLUDE_JSI_CPP
        )
endif()

set(SKIA_HEADER_PATH "${NODE_MODULES_DIR}/@shopify/react-native-skia")
add_library(
        ${PACKAGE_NAME}
        SHARED

        "cpp/cpp-adapter.cpp"
        "cpp/api/react-native-skia-skottie-module.cpp"
        "${SKIA_HEADER_PATH}/cpp/api/JsiSkHostObjects.h"
        "${SKIA_HEADER_PATH}/cpp/jsi/JsiHostObject.h"
        "${SKIA_HEADER_PATH}/cpp/jsi/JsiHostObject.cpp"
)

target_include_directories(
        ${PACKAGE_NAME}
        PRIVATE

        "${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker"
        "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
        "${NODE_MODULES_DIR}/react-native/ReactCommon"
        "${NODE_MODULES_DIR}/react-native/ReactCommon/react/nativemodule/core"
        "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/jni"

        "${SKIA_HEADER_PATH}/cpp/skia/include/config/"
        "${SKIA_HEADER_PATH}/cpp/skia/include/core/"
        "${SKIA_HEADER_PATH}/cpp/skia/include/effects/"
        "${SKIA_HEADER_PATH}/cpp/skia/include/utils/"
        "${SKIA_HEADER_PATH}/cpp/skia/include/pathops/"
        "${SKIA_HEADER_PATH}/cpp/skia/modules/"
        "${SKIA_HEADER_PATH}/cpp/skia/include/"
        "${SKIA_HEADER_PATH}/cpp/skia"

        "${SKIA_HEADER_PATH}/cpp/api"
        "${SKIA_HEADER_PATH}/cpp/jsi"
        "${SKIA_HEADER_PATH}/cpp/jni/include"
        "${SKIA_HEADER_PATH}/cpp/rnskia-android"
        "${SKIA_HEADER_PATH}/cpp/rnskia"
        "${SKIA_HEADER_PATH}/cpp/rnskia/values"
        "${SKIA_HEADER_PATH}/cpp/utils"

        cpp/skia/modules/
        cpp/skia
        cpp/api

        ${libfbjni_include_DIRS}
)

# TODO: Test: what happens if i don't actively link against those libs?
#       Answer: I think cmake won't build because it won't be able to resolve the references
#       But how does dynamic linking at load time work then? I guess in this case the headers
#       are unknown?

# Import prebuilt SKIA Skottie library
set(SKOTTIE_LIBS_PATH "${CMAKE_CURRENT_SOURCE_DIR}/../libs/android/${ANDROID_ABI}")
set (SKOTTIE_LIB "skottie")
add_library(skottie STATIC IMPORTED)
set_property(TARGET skottie PROPERTY IMPORTED_LOCATION "${SKOTTIE_LIBS_PATH}/libskottie.a")

set (SKSG_LIB "sksg")
add_library(sksg STATIC IMPORTED)
set_property(TARGET sksg PROPERTY IMPORTED_LOCATION "${SKOTTIE_LIBS_PATH}/libsksg.a")

set(SKIA_LIBS_PATH "${SKIA_HEADER_PATH}/libs/android/${ANDROID_ABI}")
set (SKIA_LIB "skia")
add_library(skia STATIC IMPORTED)
set_property(TARGET skia PROPERTY IMPORTED_LOCATION "${SKIA_LIBS_PATH}/libskia.a")

set(SKSHAPER_LIB "skshaper")
add_library(skshaper STATIC IMPORTED)
set_property(TARGET skshaper PROPERTY IMPORTED_LOCATION "${SKIA_LIBS_PATH}/libskshaper.a")

find_library(
        LOG_LIB
        log
)

find_library(
        JSI_LIB
        jsi
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

if(${REACT_NATIVE_VERSION} LESS 66)
        # JSI lib didn't exist on RN 0.65 and before. Simply omit it.
        set(JSI_LIB "")
else()
        # RN 0.66 distributes libjsi.so, can be used instead of compiling jsi.cpp manually.
        find_library(
                JSI_LIB
                jsi
                PATHS ${LIBRN_DIR}
                NO_CMAKE_FIND_ROOT_PATH
        )
endif()

find_library(
        REACT_LIB
        react_nativemodule_core
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

find_library(
        FBJNI_LIBRARY
        fbjni
        PATHS ${libfbjni_link_DIRS}
        NO_CMAKE_FIND_ROOT_PATH
)

find_library(
        TURBOMODULES_LIB
        turbomodulejsijni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

# Link
target_link_libraries(
        ${PACKAGE_NAME}
        ${LOG_LIB}
        ${FBJNI_LIBRARY}
        ${REACT_LIB}
        ${JSI_LIB}
        ${TURBOMODULES_LIB}
        ${SKOTTIE_LIB}
        ${SKSHAPER_LIB}
        ${SKSG_LIB}
        ${SKIA_LIB}
#        TODO: do i need those graphics and gl things?
        -ljnigraphics
        -lGLESv2
        -lEGL
        -landroid
)