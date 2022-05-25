var minStickers = function(stickers, target) {
    let wordMap = new Map();
    for(let i=0;i<stickers.length;i++){
        let st = stickers[i].split('')
        for(let s of st){
            console.log('wordMap',wordMap)
            if(wordMap.has(s)){
                let temp = wordMap.get(s)
                console.log('temp',temp)
                temp.add(i)
                wordMap.set(s,temp)
            }else{
                let temp = new Set();
                temp.add(i);
                wordMap.set(s,temp)
            }
            console.log('wordMap',wordMap)
        }
    }
    let res = new Set();
    for(let i=0;i<target.length;i++){
        let indexSet =  wordMap.get(target[i])
        //console.log('indexSet',indexSet,'set',set)
        res.add([...indexSet.values()])
        console.log('indexSet',indexSet,'res',res)
    }
    return res.size
};

console.log(minStickers(["with","example","science"],'thehat'))