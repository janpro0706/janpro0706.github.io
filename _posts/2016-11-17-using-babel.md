---
layout: post
title: "Babel 사용하기"
comments: true
tags: JavaScript ECMAScript babel
---

babel은 상위 버전의 JavaScript 소스 파일을 컴파일하고 실행할 수 있게 하는 자바스크립트 컴파일러이다. ES2015(ES6)로 올라오면서 문법에 큰 변화가 생겼는데, 이로 작성된 스크립트는 Node.js나 최신 브라우저에서 대부분 실행 가능하다. 하지만 ES2016, ES2017의 지원은 아직 완벽하지 않아 브라우저 간의 호환성 문제가 발생한다. React 역시 babel을 사용하여 jsx문법을 지원하고 webpack을 통해 프로젝트 구조를 관리한다.

ES2017 스크립트를 ES5 소스로 컴파일한 뒤 node로 실행하거나 babel-node를 통해 바로 실행할 수 있다. babel-node를 이용해 ES2017 스크립트 파일을 실행해보자.

ES2017 스크립트를 실행하기 위해서는 babel-cli를 설치하여 babel-node를 실행하면 된다.

{% highlight shell %}
>npm install -g babel-cli
{% endhighlight %}

ES2017 표준인 async 함수를 사용하여 Promise 패턴의 스크립트를 작성하자(async로 정의된 함수를 호출하면 Promise 객체가 리턴된다). async와 await를 테스트하기 위해 setTimeout과 await를 사용하여 sleep 함수를 만들었다.

{% highlight javascript %}
// async.js
var sleep = function sleep(millis) {
  return new Promise(r => setTimeout(r, millis));
};

var promise = async function promise(condition) {
  await sleep(2000);
  if (condition == true) {
    return Promise.resolve('조건이 참이다');
  } else {
    return Promise.reject('조건이 거짓이다');
  }
};

console.log('script start');

promise(10 == '10')
.then(function(data) {
  console.log(data);
}, function(err) {
  console.error(err);
});
{% endhighlight %}

위와 같이 스크립트를 작성하고 babel을 이용하여 쉘에서 스크립트를 실행해보자.

{% highlight shell %}
>babel-node async
{% endhighlight %}

실행해보면 제대로 작동하지 않는다. babel이 사용(transform)할 기능(arrow function 등)을 설정하지 않았기 때문이다. 각 기능별로 plugin을 추가해서 사용할 수도 있지만 preset을 통해 자바스크립트 버전별로 통합해서 사용할 수 있다. ES2015와 이후의 버전을 포괄하는 latest preset을 설치하고 config 파일을 만든다. 다시 실행해보면 제대로 동작할 것이다.

{% highlight javascript %}
// .babelrc (babel config 파일)
{
    "presets": ["latest"]
}
{% endhighlight %}

{% highlight shell %}
>npm install --save-dev babel-preset-latest
{% endhighlight %}

babel-node는 매번 컴파일-실행을 반복하기 때문에 느리다. node로 실행할 수 있도록 컴파일해보자. 컴파일된 소스는 새 JavaScript 버전의 내장 객체 및 메소드를 제공하기 위해 추가적인 모듈을 필요로 한다. npm으로 babel-polyfill을 설치하고 async.js 소스의 가장 위에 해당 모듈을 import한다.

{% highlight shell %}
>npm install --save-dev babel-polyfill
{% endhighlight %}

{% highlight javascript %}
// async.js
import 'babel-polyfill';

...
{% endhighlight %}

컴파일이 완료되면 build/async.js 파일이 만들어지고 이를 node로 실행할 수 있다.


본문에서는 latest preset로 테스트 하였지만 react 등 다른 preset들도 존재하고 커스터마이징도 가능하므로 필요에 따라 추가해서 사용하자.
