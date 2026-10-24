const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  hello: () => 'The bridge works',
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: (...args) => ipcRenderer.invoke('save-file', ...args),
  saveAsFile: (...args) => ipcRenderer.invoke('save-as-file', ...args),
});