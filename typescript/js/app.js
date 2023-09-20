"use strict";
function add(n1, n2) {
    return n1 + n2;
}
const button = document.getElementById("button");
button === null || button === void 0 ? void 0 : button.addEventListener('click', (ev) => {
    ev.preventDefault();
    console.log(add(1, 1));
});
//# sourceMappingURL=app.js.map