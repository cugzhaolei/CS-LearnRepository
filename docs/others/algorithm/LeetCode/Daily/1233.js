var removeSubfolders = function(folder) {
    folder.sort();
    const ans = [folder[0]];
    for (let i = 1; i < folder.length; ++i) {
        const pre = ans[ans.length - 1].length;
        if (!(pre < folder[i].length && ans[ans.length - 1] === (folder[i].substring(0, pre)) && folder[i].charAt(pre) === '/')) {
            ans.push(folder[i]);
        }
    }
    return ans;
};


console.log(removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"]))
console.log(removeSubfolders(["/a","/a/b/c","/a/b/d"]))

