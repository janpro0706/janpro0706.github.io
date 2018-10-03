---
layout: post
title: "React Native 및 모듈 연동 이슈 정리"
comments: true
tags: issues ReactNative
---

React Native 프로젝트를 구축하고 필요한 모듈을 연동하는 과정에서 발생했던 이슈와 해결방법을 간단하게 정리한다.

## 1. index.js 엔트리 파일을 못 찾는 경우

>Response error 404, Cannot find entry file index.android.js in any of the roots: [\"/Users/mytotoro/desktop/app/node_modules/react-native/packager\"]

엔트리 파일이나 bundle location을 변경했을 때 엔트리 파일이 제대로 있는 대도 위와 같은 에러를 내는 경우가 있다. 이때는 다음과 같이 캐시 파일을 지워주면 된다.

>\> npm start -- --reset-cache
\> react-native run-ios

## 2. XCode 10에서의 ios 헤더 파일 빌드 에러

>react native ios build input file cannot be found double-conversion

XCode 10로 업데이트 하면서 발생한 이슈로 보이며 다음과 같이 해결하였다.
>\> cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
\> cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../

[관련 깃허브 이슈 링크](https://github.com/facebook/react-native/issues/21168)

## 3. XCode 10에서의 '@babel/runtime' 모듈 누락

>Module @babel/runtime/helpers/interopRequireDefault does not exist in the Haste module map

해결 방법은 @babel/runtime 모듈을 직접 설치해주면 된다.
>\> npm add @babel/runtime
\> npm install

[이슈 링크](https://github.com/facebook/react-native/issues/21310)
