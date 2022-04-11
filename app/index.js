const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const startServer = require('./server/bin/www');
const path = require('path')

const logoPath = path.join(__dirname,'logo.png')

function createWindow() {
  startServer();
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      contextIsolation: false,
    },
  });
  win.menuBarVisible = false;
  win.setIcon(logoPath)
  win.on('close', (event) => {
    event.preventDefault()
    win.hide()
  })
  win.loadFile('index.html');
  return win
}

let tray = null;
const prepareTray = (win) => {
  tray = new Tray(logoPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出应用',
      type: 'normal',
      click: () => {
        app.exit()
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('待办工作台');
  tray.on('click', () => {
    win.show()
  })
};

app.whenReady().then(() => {
  const win = createWindow();
  prepareTray(win);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
