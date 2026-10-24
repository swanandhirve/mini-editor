const { app, BrowserWindow,
    ipcMain, dialog
 } = require('electron');
const path = require('path');
const fs =  require('node:fs');

let currentFilePath = null;

const createWindow = () => {
    const webWin = new BrowserWindow({
        width: 1920,
        height: 1080,
        autoHideMenuBar: true,
        minWidth: 200,
        minHeight: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    webWin.loadFile('index.html');
}

app.whenReady()
    .then(() => {
        createWindow();
    });

ipcMain.handle('open-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                'name': 'Text',
                'extensions': [
                    'txt',
                    'md',
                    'js',
                    'json'
                ]
            },
        ]
    })

    if (canceled)
        return null;

    let text = await fs.readFileSync(filePaths[0], 'utf-8');
    currentFilePath = filePaths[0]
    return text;
});

ipcMain.handle('save-file', async (event, info) => {
    if (!currentFilePath) 
        return false;

    let text = info.text;
    try {
        await fs.writeFileSync(currentFilePath, text, 'utf-8');

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
});

ipcMain.handle('save-as-file', async (event, info) => {
    if (!currentFilePath) 
        return false;
    
    let text = info.text;
    let { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: currentFilePath,
        title: 'Save Your Document',
        filters: [
            { 
                'name': 'Text Files', 
                'extensions': [
                    'txt',
                    'md',
                    'js',
                    'json'
                ] 
            },
            { 
                name: 'All Files', 
                extensions: ['*'] 
            }
        ]
    })

    if (canceled)
        return;

    try {
        await fs.writeFileSync(filePath, text, 'utf-8');
        currentFilePath = filePath;
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
});