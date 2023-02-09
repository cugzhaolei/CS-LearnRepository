/**
 * @param {number[]} heights
 * @return {number}
 */
//  var heightChecker = function(heights) {
//     //let expected = heights.map(item=>item).sort((a,b)=>a-b);
//     let expected = [].concat(heights).sort((a,b)=>a-b)
//     let result = 0;
//     for(let i=0;i<heights.length;i++){
//         if(heights[i]!=expected[i]){
//             result++
//         }
//     }
//     return result;
// };


var heightChecker = function(heights){
    let arr = new Array(101).fill(0);
    for(let height of heights){
        arr[height]++
    }
    let count = 0;
    for(let i=0,j=0;i<arr.length;i++){
        while(arr[i]-- >0){
            if(heights[j++]!=i){
                count++
            }
        }
    }
    return count;
}
console.log(heightChecker([1,1,4,2,1,3]))
