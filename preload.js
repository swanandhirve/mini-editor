const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  hello: () => 'The bridge works',
  openFile: () => ipcRenderer.invoke('open-file')
});