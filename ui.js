export class Editor {

    constructor() {}

    static registerOpenFileButton() {
        let _this = this;
        document.getElementById('openFile').onclick = function () {
            _this.#onOpenFile();
        }
    }

    static async #onOpenFile() {
        try {
        const text = await window.api.openFile();
        if (!text || (text && text.trim() === ''))
            return;

        let textArea = document.getElementById('editor');
        textArea.value = text;
        } catch (err) {
            console.error(err);
        }
    }
}

// module.exports = { Editor };