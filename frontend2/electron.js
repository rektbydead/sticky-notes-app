import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function main() {
    const window = new BrowserWindow({
		// webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: false },
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

    Menu.setApplicationMenu(null);
    //await window.loadFile("app.js")
}

app.whenReady()
    .then(main)