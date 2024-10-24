// ./public/electron.js
const path = require('path');
const fs = require('fs');
const os = require('os');
//const mysql = require('mysql2');
// const mysql = require('mysql2');
const { app, BrowserWindow, Tray, Menu, globalShortcut } = require('electron');
const remoteMain = require('@electron/remote/main');
const { setup: setupPushReceiver } = require('electron-push-receiver');


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
      allowRunningInsecureContent: true,
      devTools: true // Disable Developer Tools
    },
    frame: false,
    show: false, // don't show the main window
  });

  splash = new BrowserWindow({ width: 680, height: 481, transparent: true, frame: false, alwaysOnTop: true });
  splash.loadURL(`file://${__dirname}/splash.html`);
  // and load the index.html of the app.
  setupPushReceiver(mainWindow.webContents);
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
    mainWindow.setContentProtection(false)
    const platform = os.platform();

    if (platform == 'darwin') {
      mainWindow.on('focus', async () => {
        console.log('Window got focus');
        const result = await dialog.showMessageBox(mainWindow, {
          message: 'Do not minimize the application while in use or try to open any other application. Please wait while we are closing background applications due to security reasons. This might restore your internet connection for a few seconds.',
          type: 'info',
          icon: path.join(__dirname, 'Image/icons/png/64x64.png'),
          buttons: ['Ok'],
        });
        if (result.response === 0) {
          exec('pgrep VTDecoderXPCService', (err, stdout) => {
            if (err) {
              console.error('Error executing pgrep:', err);
              return;
            }
            const a = stdout.split('\n').filter(line => line.trim() !== '');
            exec('ps ax | egrep -v "preplearn" | cut -b1-06', (err, stdout) => {
              if (err) {
                console.error('Error executing ps:', err);
                return;
              }

              const b = stdout.split('\n').filter(line => line.trim() !== '');
              const result = b.map(value => value.trim()).filter(item => !a.includes(item));

              result.slice(2).forEach(pid => {
                exec(`kill -9 ${pid}`, (err) => {
                  if (err) {
                    console.error(`Error killing process ${pid}:`, err);
                  }
                });
              });
            });
          });
        }
      });
    }
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
