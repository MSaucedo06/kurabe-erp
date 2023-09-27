export function clearElement(element) {
    if (element.childElementCount > 0) {
        element.childNodes.forEach(() => {
            element.removeChild(element.lastElementChild); 
        });
    }
}