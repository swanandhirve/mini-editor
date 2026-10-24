export class Editor {

    constructor() {}

    static getText() {
        return document.getElementById('editor').value;
    }

    static init() {
        this.registerOpenFileBtn();
        this.registerSaveFileBtn();
        this.registerSaveAsFileBtn();

        this.#enableFields();
    }

    static #enableFields(enable = false) {
        let saveBtn = document.getElementById('saveFile');
        let saveAsBtn = document.getElementById('saveAsFile');
        let textArea = document.getElementById('editor');
        textArea.classList.add('disabled');
        saveBtn.classList.add('disabled');
        saveAsBtn.classList.add('disabled');
        textArea.disabled = true;
        saveBtn.disabled = true;
        saveAsBtn.disabled = true;


        if (enable) {
            textArea.disabled = false;
            saveBtn.disabled = false;
            saveAsBtn.disabled = false;
            saveBtn.classList.remove('disabled');
            saveAsBtn.classList.remove('disabled');
            textArea.classList.remove('disabled');
        }
    }

    static registerOpenFileBtn() {
        let _this = this;
        document.getElementById('openFile').onclick = function () {
            _this.#onOpenFile();
        }
    }
    
    static registerSaveFileBtn() {
        let _this = this;
        document.getElementById('saveFile').onclick = function () {
            _this.#onSaveFile();
        }
    }
    
    static registerSaveAsFileBtn() {
        let _this = this;
        document.getElementById('saveAsFile').onclick = function () {
            _this.#onSaveAsFile();
        }
    }

    static async #onOpenFile() {
        try {
            const text = await window.api.openFile();
            if (!text || (text && text.trim() === ''))
                return;

            let textArea = document.getElementById('editor');
            this.#enableFields(true); 
            textArea.value = text;
        } catch (err) {
            console.error(err);
        }
    }

    static async #onSaveFile() {
        try {
            let textArea = document.getElementById('editor');
            const res = await window.api.saveFile({
                text: textArea.value
            });

            this.#showAlertAfterSave(res);
        } catch (err) {
            console.error(err);
        }
    }

    static async #onSaveAsFile() {
        try {
            let textArea = document.getElementById('editor');
            const res = await window.api.saveAsFile({
                text: textArea.value
            });

            this.#showAlertAfterSave(res);
        } catch (err) {
            console.error(err);
        }
    }

    static #showAlertAfterSave(res) {
        if (res === true)
            alert('File saved successfully');
        else if (res === false)
            alert('Error in saving the file');
    }
}