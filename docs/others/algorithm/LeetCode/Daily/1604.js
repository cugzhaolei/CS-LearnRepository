var alertNames = function(keyName, keyTime) {
    const timeMap = new Map();
    const n = keyName.length;
    for (let i = 0; i < n; i++) {
        const name = keyName[i];
        const time = keyTime[i];
        if (!timeMap.has(name)) {
            timeMap.set(name, []);
        }
        const hour = (time[0].charCodeAt() - '0'.charCodeAt()) * 10 + (time[1].charCodeAt() - '0'.charCodeAt());
        const minute = (time[3].charCodeAt() - '0'.charCodeAt()) * 10 + (time[4].charCodeAt() - '0'.charCodeAt());
        timeMap.get(name).push(hour * 60 + minute);
    }
    let res = [];
    const keySet = timeMap.keys();
    for (const name of keySet) {
        const list = timeMap.get(name);
        list.sort((a, b) => a - b);
        const size = list.length;
        for (let i = 2; i < size; i++) {
            const time1 = list[i - 2], time2 = list[i];
            const difference = time2 - time1;
            if (difference <= 60) {
                res.push(name);
                break;
            }
        }
    }
    res.sort();
    return res;
};