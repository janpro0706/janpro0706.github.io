const tags = document.getElementsByClassName('tag-nav');
const tagArray = [ ...tags ];
const tagArchives = document.getElementsByClassName('tag-archive');
const tagArchiveArray = [ ...tagArchives ];

(() => {
  let prevIdx = -1;
  let curIdx;

  tagArray.forEach(tag => {
    tag.addEventListener('change', (e) => {
      const idx = tagArray.indexOf(tag);
      curIdx = idx - 1;
      console.log(curIdx);

      if (curIdx == -1) {
        tagArray[0].closest('.hashtag').classList.add('selected');

        tagArchiveArray.forEach((t, i) => {
          t.classList.remove('hide');
          tagArray[i + 1].closest('.hashtag').classList.remove('selected');
        });
      } else {
        tagArray[0].closest('.hashtag').classList.remove('selected');

        tagArchiveArray.forEach((t, i) => {
          if (i == curIdx) {
            tagArchiveArray[i].classList.remove('hide');
            tagArray[i + 1].closest('.hashtag').classList.add('selected');
          } else {
            tagArchiveArray[i].classList.add('hide');
            tagArray[i + 1].closest('.hashtag').classList.remove('selected');
          }
        });
      }

      prevIdx = curIdx;
    });
  });
})();

(() => {
  const urlSearch = new URLSearchParams(location.search);

  if (urlSearch.has('tag')) {
    const tagName = urlSearch.get('tag');

    const tagNames = [ ...tagArray.slice(1) ].map(t => {
      return t.closest('label').innerText;
    });

    const idx = tagNames.indexOf(tagName);
    if (idx >= 0) {
      tagArchiveArray[idx].classList.remove('hide');
      tagArray[idx + 1].closest('.hashtag').classList.add('selected');

      tagArchiveArray.forEach((t, i) => {
        if (i != idx) {
          tagArchiveArray[i].classList.add('hide');
        }
      })
      tagArray[0].closest('.hashtag').classList.remove('selected');
    }
  }
})();
