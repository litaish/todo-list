/* contains utility functions that can be used in other modules */

const createSvgElement = (path, classes) => {
    const obj = document.createElement("object");
    obj.setAttribute("data", path);
    obj.setAttribute("type", "image/svg+xml");

    if (classes.length !== 0) {
        for (let i = 0; i < classes.length; i++) {
            obj.classList.add(classes[i]);
        }
        return obj;
    } else {
        return obj;
    }
}

export {
    createSvgElement,
}