---
layout: page
permalink: /tags/
title: Tags
---

<div class="tag">
  <h1>Tags</h1>
  <ul class="tag-collection">
    <li>
      <label class="hashtag selected"><input class="tag-nav" type="radio" name="tag" checked />All</label>
    </li>
    {% for tag in site.tags %}
      <li>
        <label class="hashtag"><input class="tag-nav" type="radio" name="tag" />{{ tag | first }}</label>
      </li>
    {% endfor %}
  </ul>
</div>

<div class="archive">
  {% for tags in site.tags %}
    {% capture tag %}{{ tags | first }}{% endcapture %}
    <div class="tag-archive">
      <h1>#{{ tag }}</h1>
      <div class="catalogue">
        {% for post in site.tags[tag] %}
          <a href="{{ post.url | prepent: site.baseurl }}" class="catalogue-item" style="display: block; padding: 0">
            <div>
              <p style="display: inline-block">{{ post.title }}</p>
              <time datetime="{{ post.date }}" class="catalogue-time">{{ post.date | date: "%Y.%m.%d" }}</time>
            </div>
          </a>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>

<script>
  {% include tag-nav.js %}
</script>
