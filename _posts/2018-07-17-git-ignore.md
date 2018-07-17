---
layout: post
title: "파일을 git으로부터 제외시키기"
date: 2018-07-17
tags: git

---

git을 사용하다보면 버전관리를 하고 싶지 않은 파일이 생길 수 있다. 두가지 상황에서 해당 파일을 제외시키는 방법을 알아보자.

## Ignore untracked file
먼저, 해당 파일이 아직 git에 추적되지 않은 상태(untracked)라면 간단히 .gitignore에 파일 이름의 패턴을 추가하면 git이 해당 패턴의 파일을 추적하지 않게 된다. 아래 상황들에서도 .gitignore에 패턴을 추가해줘야 더 이상 추적하지 않는다.

## Ignore tracked or committed file
파일이 git에 추적되고 있거나 이미 커밋된 상태라면 추적 상태를 해제하기 위해 git rm 커맨드를 사용하여야 한다.

{% highlight bash %}
git rm <pattern or name>
{% endhighlight %}

위의 커맨드로 파일을 비추적 상태로 만들고 스냅샷에 저장할 수 있다. 하지만 실제 파일도 삭제되어 버리므로 로그 파일이나 build 디렉토리를 제외시키는 것이 아니라면 다음 커맨드를 사용해야 한다.

{% highlight bash %}
git rm --cached <pattern or name>
{% endhighlight %}

위의 커맨드는 git으로부터 파일을 관리하지 않도록 하면서 실제 파일을 삭제하지 않는다. configuration이나 리소스 파일 등을 제외시킬 때 유용하다. 디렉토리를 제외시키려면 -r 파라미터를 추가해주면 된다.
