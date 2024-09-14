const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  executeSqlFile: (filePath) => ipcRenderer.invoke('execute-sql-file', filePath)
});