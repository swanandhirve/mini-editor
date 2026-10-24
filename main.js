const { app, BrowserWindow,
    ipcMain, dialog
 } = require('electron');
const path = require('path');
const fs =  require('fs/promises');

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

    return await fs.readFile(filePaths[0], 'utf-8');
});