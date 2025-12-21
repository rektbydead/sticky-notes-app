const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')


async function main() {
    const window = new BrowserWindow({
        // webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: false },
        icon: path.join(__dirname, './frontend/favicon.ico'),
        width: 1920,
        height: 1080,
        minWidth: 1280,
        minHeight: 800,

        titleBarOverlay: {
          symbolColor: '#FFF',
          color: '#2b252c',
          height: 10
        }
    })

    Menu.setApplicationMenu(null)
    window.loadURL("http://web-dev-grupo01.dei.uc.pt/")
}

app.whenReady()
    .then(main)