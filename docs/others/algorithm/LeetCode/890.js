/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function(words, pattern) {
    let map = new Map();
    let indexArray = [];
    let patternIndex = '';
    for(let i=0;i<pattern.length;i++){
        if(!map.has(pattern[i])){
            patternIndex += ''+i;
            map.set(pattern[i],i)
        }else{
            let index = map.get(pattern[i]);
            patternIndex += ''+index;
        }
    }

    for(let word of words){
        map.clear();
        let tempIndex = '';
        for(let i=0;i<word.length;i++){
            if(!map.has(word[i])){
                tempIndex += ''+i;
                map.set(word[i],i)
            }else{
                let index = map.get(word[i]);
                tempIndex += ''+index;
            }
        }
        if(patternIndex==tempIndex){
            indexArray.push(word)
        }
    }
    return indexArray;
};

console.log(findAndReplacePattern(["abc","deq","mee","aqq","dkd","ccc"],'abb'))