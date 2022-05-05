function setStorage({ key, data }) {
    window.localStorage.setItem(key, JSON.stringify(data));
}
function getStorage({
    key,
    success,
}) {
    let data = window.localStorage.getItem(key);
    if (typeof data == "string") {
        success(JSON.parse(data));
    } else {
        success([]);
    }
}
function removeALLStorage({ key, success }) {
    window.localStorage.removeItem(key);
    success();
}
function removeStorage({key,data,success}){
    let keyArr = window.localStorage.getItem(key);
    if(typeof keyArr == "string") {
        keyArr = JSON.parse(keyArr)
    }
    keyArr.splice(keyArr.indexOf(data), 1)
    window.localStorage.setItem(key, JSON.stringify(keyArr));
    success();
}

export { setStorage, getStorage, removeStorage, removeALLStorage};