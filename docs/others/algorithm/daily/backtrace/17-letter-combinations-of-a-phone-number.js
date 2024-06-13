/**
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function (digits) {
    let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    let len = digits.length
    if (len == 0) {
        return []
    }


    let res = []
    let path = new Array(len).fill('')

    console.log('path', path)
    let dfs = (i) => {
        if (i == len) {
            res.push(path.join(""))
            return
        }
        map[parseInt(digits[i])].split('').forEach(s => {
            path[i] = s // enumerate each item
            console.log('s', s, ` path[${i}]: ${path[i]}`)

            dfs(i + 1) // recursive
        })

        console.log('res: ', res, 'i: ', i, `digits[${i}]:`, digits[i], `path[${i}]`, path[i], 'path: ', path)

    }

    dfs(0)
    console.log('path', path)

    return res;
};


console.log(letterCombinations('23'))
