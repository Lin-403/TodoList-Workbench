var express = require('express');
var router = express.Router();
const fs = require('fs');
const { request } = require('https');
const path = require('path')
const updataDBFile = require('../utils')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//写入json文件接口  (增加)
router.post('/create', (req, res, next) => {
  // console.log(req.body,'post Body')
  const dbPath = path.join(__dirname, '..', 'db')
  const newTask = req.body
  const dbFile = `${dbPath}\\DOING.json`
  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    let newData = null
    if (data) {
      newData = JSON.stringify([...JSON.parse(data), newTask])
    }
    else {
      newData = JSON.stringify(newTask)
    }
    fs.writeFile(dbFile, newData, wErr => {
      if (wErr) {
        res.send({
          data: [],
          code: 0,
          msg: wErr
        });
        return
      }
      //文件写入成功。
      res.send({
        data: newTask,
        code: 1,
        msg: ''
      })
      return
    })
  })

});


//获取json文件内容接口 (查询)
router.get('/list', (req, res, next) => {
  const type = req.query.type
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = type === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    //文件写入成功。
    res.send({
      data: JSON.parse(data),//返回一个JSON
      code: 1,
      msg: ''
    })
    return
  })
})


//删除
router.post('/remove', (req, res, next) => {
  const dbPath = path.join(__dirname, '..', 'db')
  const taskID = req.body?.taskID;
  const type = req.body.type
  
  if (!taskID) {
    res.send({
      data: [],
      code: 0,
      msg: '非法任务ID'
    });
    return
  }
  //根据状态判断选择文件
  const dbFile = String(type) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  updataDBFile(dbFile, {
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onReadOver: (data) => {
      const removeTarget = data.find(i => i.taskID === taskID)
      if (!data.length || !removeTarget) {
        res.send({
          data: [],
          code: 0,
          msg: '无效任务ID'
        });
        return false;
      }
      return data.filter(i => i.taskID !== taskID)
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onWriteOver: () => {
      res.send({
        code: 1,
        msg: ''
      });
    }
  })
});


//修改
router.post('/update', (req, res, next) => {
  const dbPath = path.join(__dirname, '..', 'db')
  const task = req.body
  console.log(req.body,'task')
  const taskID = task?.taskID;
  const type=req.body.type
  // const type=req.body.type!==undefined?req.body.type:task.status
  delete task.type

  if (!taskID) {
    res.send({
      data: [],
      code: 0,
      msg: '非法任务ID'
    });
    return
  }
  const dbFile = String(type) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  

  updataDBFile(dbFile,{
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
    },
    onReadOver: (data)=>{
      const target = data.find(i => i.taskID === taskID)
      console.log(task,'task')
      console.log(target,'target')
      if(target.status===task.status){
        Object.assign(target, task)
        return data
      }
      else{
        const otherData = data.filter(i => i.taskID !== taskID)
        const changeData = target
        Object.assign(target, task)
        const changeDbFile=String(task.status) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
        updataDBFile(changeDbFile,{
          onReadError: (err) => {
            res.send({
              data: [],
              code: 0,
              msg: err
            });
          },
          onWriteError: (err) => {
            res.send({
              data: [],
              code: 0,
              msg: err
            });
          },
          onReadOver:data2=>{
            data2.push(changeData)
            return data2
          },
          onWriteOver:()=>{

          }
        })
        return otherData
      }
    },
    onWriteOver:()=>{
      res.send({
        code: 1,
        msg: ''
      })
    }
  })


});


//获取json文件内容接口 (查询)
router.get('/count', (req, res, next) => {
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFileList=[`${dbPath}\\DOING.json`, `${dbPath}\\DONE.json`]
  const result={}

  fs.readFile(dbFileList[0], 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    result['doing']=JSON.parse(data).length
    //文件写入成功。
    fs.readFile(dbFileList[1], 'utf8', (err, data) => {
      if (err) {
        res.send({
          data: [],
          code: 0,
          msg: err
        });
        return;
      }
      result['done']=JSON.parse(data).length
      //文件写入成功。
      res.send({
        data: result,//返回一个JSON
        code: 1,
        msg: ''
      })
    })
  })
})

module.exports = router;
