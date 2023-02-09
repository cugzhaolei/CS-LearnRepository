/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//  var wiggleSort = function(nums) {
//     let n = nums.length;
//     nums.sort((a,b)=>a-b);

//     let min = nums.slice(0,n>>1);
//     let max = nums.slice(n>>1);

//     let res = [];
//     while(min.length>0||max.length>0){
//         if(min.length>0){
//             res.push(min.shift());
//         }
//         if(max.length>0){
//             res.push(max.shift());
//         }
//     }



//     console.log(min,max)
//     return res;
// };

var wiggleSort = function(nums) {
    const [...temp] = nums, n = nums.length
           
    temp.sort((a,b)=> a-b);
    // for(let i=Math.floor((n+1)/2)-1,j=n-1,index=0;index<n;index++,i--,j--){
    //   nums[index++] = temp[i];
    //   if(index<n){
    //     nums[index] = temp[j]
    //   }
    // }

    for(let i=n>>1,j=n-1,index=0;index<n;index++,i--,j--){
        nums[index++] = temp[i];
        if(index<n){
          nums[index] = temp[j]
        }
      }
    return nums;
  }



console.log(wiggleSort([1,5,1,1,6]))

for(let i=0;i<50000;i++){
    if(Math.floor((i+1)/2)-1!=i>>1){
        console.log(i)
    }
}