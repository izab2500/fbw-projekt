/**
 * Change the positions of the "from" and "to" select-elements in the DOM.
 * Each time this function is called (when the swap button is clicked),
 * the positions of the two select elements are switched.
 */
export function swapSelectElements() {
    const parent = document.querySelector(".flex-container");
    //div from or div to
    const div1 = parent.children[0];
    //div to or div from
    const div2 = parent.children[1];
    //div with swapbtn
    const swapBtnDiv = parent.children[2];
    parent.insertBefore(div2, div1);
    parent.insertBefore(swapBtnDiv, div2);
}