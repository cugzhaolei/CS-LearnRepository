/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function (first, second) {
  let count = 0;

  if (Math.abs(first.length - second.length) > 1) {
    return false;
  } else {
    if (first.length > second.length) {
      let j = 0;
      for (let i = 0; i < first.length; i++) {
        console.log('first>second',"first", first[i],'i',i, "second", second[j],'j',j,'count',count);
        if (second[j] == first[i]) {
            j++;
        } else {
            count++;
        }
      }
    } else if (first.length < second.length) {
      let j = 0;
      for (let i = 0; i < second.length; i++) {
        console.log('second>first',"first", first[j],'j',j, "second", second[i],'i',i,'count',count);
        if (second[i] == first[j]) {
            j++;
        } else {
            count++;
        }
      }
    } else if (first.length == second.length) {
      for (let i = 0; i < first.length; i++) {
        if (second[i] != first[i]) {
          count++;
        }
      }
    }
  }
  return count <= 1;
};

console.log(oneEditAway("teacher", "treacher"));
