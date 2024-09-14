// ./public/electron.js
const path = require('path');
const fs = require('fs');
//const mysql = require('mysql2');
// const mysql = require('mysql2');
const { app, BrowserWindow, Tray, Menu, globalShortcut } = require('electron');
const remoteMain = require('@electron/remote/main');


remoteMain.initialize();

const isDev = require('electron-is-dev');

let mainWindow;
let splash;
let tray;



function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'show',
    icon: path.join(__dirname, 'ic_launcher.ico'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      devTools: true // Disable Developer Tools
    },
    frame: false,
    show: false, // don't show the main window
  });

  splash = new BrowserWindow({ width: 680, height: 481, transparent: true, frame: false, alwaysOnTop: true });
  splash.loadURL(`file://${__dirname}/splash.html`);
  // and load the index.html of the app.
  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.setBackgroundColor('#fff');
    mainWindow.setMenuBarVisibility(false);
  });
 
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Unregister global shortcuts when the app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
