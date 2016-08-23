/**
 * Created by user on 23.8.16.
 */


function renderSpinner(domNode) {
    domNode.innerHTML = "<div class=\"spinner\"></div>";
}


function renderError(respData) {
    return `<div>${respData.error.message}</div>`;
}


export {
    renderSpinner,
    renderError
};
