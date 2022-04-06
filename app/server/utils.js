const fs =require('fs')

const updateDBFile=(filePath,handlers)=>{
    const {onReadError,onReadOver,onWriteError,onWriteOver} =handlers
    fs.readFile(filePath, 'utf8', (err, dataStr) => {
        if (err) {
          onReadError?.(err)
          return;
        }
        const data = dataStr ? JSON.parse(dataStr) : []
        const readOverResult=onReadOver?.(data)
        if(readOverResult!==false){
            const newData=readOverResult||[]
            const newDataStr = JSON.stringify(newData)
            fs.writeFile(filePath, newDataStr, wErr => {
              if (wErr) {
                onWriteError?.(wErr)
                return
              }
              //文件写入成功。
              onWriteOver?.()
              return
            })
        }
        
      })
}

module.exports=updateDBFile