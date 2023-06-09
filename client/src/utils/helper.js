import toast from "react-hot-toast";

/**
 * Creates an artificial delay. NOTE: Only use this in development to test some features.
 * @param {number} delay in milliseconds
 */
export const sleep = (delay) => new Promise((r) => setTimeout(r, delay));

/**
 * Get cookie value.
 * @param {string} name
 */
export const getCookie = (name) => {
    const cookie = document.cookie
        .split(";")
        .find((c) => c.includes(name))
        .split("=")[1];

    return cookie;
};

/**
 * @param {string} name
 * @param {string} message
 */
export const toastNotify = (type, message) => toast[type](message);

/**
 * Returns an array with unique objects.
 * @param {Array} arr
 * @param {string} identifier unique identifier of an object - like ID
 */
export const uniqueObjectsArray = (arr, identifier) => {
    const uniqueIds = [];
    const uniqueArr = [];

    for (let i = 0; i < arr.length; i++) {
        const id = arr[i][identifier];
        if (uniqueIds.includes(id)) continue;
        uniqueIds.push(id);
        uniqueArr.push(arr[i]);
    }

    return uniqueArr;
};
