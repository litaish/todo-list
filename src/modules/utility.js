/* contains utility functions that can be used in other modules */

const createSvgIcon = (path, classes) => {
    const obj = document.createElement("img");
    obj.src = path;

    if (classes.length !== 0) {
        for (let i = 0; i < classes.length; i++) {
            obj.classList.add(classes[i]);
        }
        return obj;
    } else {
        return obj;
    }
}

const setAttributes = (el, attrs) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

export {
    createSvgIcon,
    setAttributes,
}