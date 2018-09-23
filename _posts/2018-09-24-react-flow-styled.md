---
layout: post
title: "React App에 flow, styled-components 적용하기"
comments: true
tags: JavaScript React flow styled-components
---

React App 프로젝트에 정적 타입 체커 모듈인 flow와 컴포넌트 스타일링 모듈인 styled-components를 적용하는 과정을 정리해보자.


먼저, 편의를 위해 create-react-app 모듈을 사용하여 React 프로젝트를 생성하고 프로젝트 구조를 커스터마이징하기 위해 eject시켜준다. 본문에서는 npx를 사용하여 전역 모듈의 스크립트를 실행하였다.

{% highlight shell %}
>npx create-react-app (프로젝트명)
>cd (프로젝트명)
>npm run eject
{% endhighlight %}


다음으로 flow를 적용시키기 위해 프로젝트 의존성 모듈을 설치한다.

{% highlight shell %}
>npm install --save flow-bin babel-preset-flow
>npx flow init
{% endhighlight %}

그리고 React flow를 적용하기 위해 다음 모듈을 설치한다.

{% highlight shell %}
>npm install --save prop-types prop-types-extra babel-plugin-react-flow-props-to-prop-types
{% endhighlight %}

npx flow init을 하게 되면 프로젝트 루트에 .flowconfig 파일이 생성된다. 여기에 flow 타입 체킹을 하거나 하지 않을 파일들을 관리할 수 있다. src 디렉토리 외에는 제외시켜주자.

>\# .flowconfig
>
>[ignore]
>
>.\*/config/.\*
>
>.\*/node_modules/.\*
>
>.\*/public/.\*
>
>.\*/scripts/.\*
>
>.\*\.test.js
>
>.\*/src/registerServiceWorker.js
>
>.\*/src/index.js

그리고 babel 프리셋과 플러그인을 package.json의 "babel" 항목에 추가한다.

{% highlight javascript %}
// package.json

{
​	"babel": {
​		"presets": [ "react-app", "flow" ],
​		"plugins": [ "react-flow-props-to-prop-types" ]
​	}
}
{% endhighlight %}

이제, React App을 실행하기 전에 타입 검사를 하기 위해 flow를 실행하는 스크립트를 package.json 파일에 작성한다.

{% highlight javascript %}
// package.json

{
​	"scripts": {
​		"start": "flow && node scripts/start.js",
​		"build": "flow && node scripts/build.js",
​		/* and more scripts... */
​	}
}
{% endhighlight %}

커맨드라인에 flow나 npm run start를 실행하면 정적 타입 체크를 하는 것을 볼 수 있다. React flow를 적용시켰다.



이제 styled-components를 적용시켜보자.

단순히 React에 styled-components를 적용시키듯이 하면 될 줄 알았는데 flow 모듈에서 추가적인 작업이 필요하다.

flow를 사용할 때, flow를 적용시킨 파일에서 flow 타입 체킹을 하지 않는(다시말해, 할 필요가 없는) 외부 라이브러리를 import해야할 때가 있다. 이때 import 구문에서 해당 모듈을 해석할 수 없다는 에러를 내는데 이를 해결하기 위해 flow-typed라는 모듈에서 미리 정의된 해당 라이브러리를 따로 설치해야 한다.(이를 flow에서는 [library interface definition](https://flow.org/en/docs/libdefs/)이라고 부른다.)

방법은 다음과 같이 flow-typed 모듈을 통해 라이브러리를 설치하면 된다.

{% highlight shell %}
>npx flow-typed install styled-components
{% endhighlight %}

이제 flow와 함께 정상적으로 styled-components 모듈을 사용할 수 있는 것을 확인해볼 수 있다.