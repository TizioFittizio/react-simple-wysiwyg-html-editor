export const selectElementContents = (element: HTMLElement) => {
    const document: any = window.document;
    if (window.getSelection && document.createRange) {
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        sel.removeAllRanges();
        sel.addRange(range);
    } 
    else if (document.selection && document.body.createTextRange) {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(element);
        textRange.select();
    }
}