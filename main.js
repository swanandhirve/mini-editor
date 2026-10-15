const { app, BrowserWindow } = require('electron');


const createWindow = () => {
    const webWin = new BrowserWindow({
        width: 1920,
        height: 1080,

        minWidth: 200,
        minHeight: 200,
        
    })

    webWin.loadFile('index.html');
}

app.whenReady()
    .then(() => {
        createWindow();
    });