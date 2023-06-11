import { AsyncLocalStorage } from "node:async_hooks";

const asyncStorage = new AsyncLocalStorage();
const storage = new Map();

/**
 * 
 * @param {("get"|"set"|"clear"|"delete")} action 
 * @param {string?} key 
 * @param {*} value 
 */
export default function storeAction(action, key, value) {
    let returnValue = null;
    try {
        asyncStorage.run(storage, () => {
            /** @type {Map} */
            const store = asyncStorage.getStore();

            switch (action) {
                case "set":
                case "get":
                    returnValue = store[action](key, value);
                    break;
                case "clear":
                case "delete":
                    returnValue = store[action]();
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log(err.message);
        returnValue = error;
    }

    return returnValue;
}