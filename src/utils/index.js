function toThousands(num, n, separator) {
    let parts;
    num = num + "";
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {

        let n1 = Math.pow(10, n);

        num = (Math.round(num * n1) / n1).toFixed(n);

        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
    }
    return NaN;
}

function clearMerge(self, target) {
    _.forEach(target, (value, key) => {
        if (!_.isNil(self[key])) {
            target[key] = self[key]
        }
    })
    return target
}

export {toThousands, clearMerge}
