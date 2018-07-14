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
    <div class="tag-archive">
      {% capture tag %}{{ tags | first }}{% endcapture %}
      <h1>{{ tag }}</h1>
      {% for post in site.tags[tag] %}
        <p>{{ post.title }}</p>
      {% endfor %}
    </div>
  {% endfor %}
</div>

<script>
  {% include tag-nav.js %}
</script>
