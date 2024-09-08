export const copyClipboard = (copy: string) => {
    navigator.clipboard.writeText(copy).then(() => {
        alert("Скопировано");
    });
};
