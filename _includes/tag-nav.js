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
        tagArchiveArray.forEach((t, i) => {
          if (i != prevIdx) {
            t.classList.remove('hide');
          }
        });
      } else {
        if (prevIdx == -1) {
          tagArchiveArray.forEach((t, i) => {
            if (i != curIdx) {
              t.classList.add('hide');
            }
          });
        } else {
          tagArchiveArray[prevIdx].classList.add('hide');
          tagArchiveArray[curIdx].classList.remove('hide');
        }
      }

      prevIdx = curIdx;
    });
  });
})();
