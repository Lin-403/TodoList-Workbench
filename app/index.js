const { app, BrowserWindow } = require('electron')
const  startServer  = require('./server/bin/www')

const createWindow = () => {

    startServer()
    //创建一个窗口对象
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
   //读取文件作为窗口
    win.loadFile('index.html')
  }
  
//准备完毕展示窗口
  app.whenReady().then(() => {
    createWindow()
  })

  //窗口关闭，同时关闭相应进程
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })