var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//写入json文件接口  (增加)
router.post('/create', (req, res, next)=>{
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
    })
  })

});


//获取json文件内容接口 (查询)
router.get('/list', (req, res, next)=>{

  const dbPath = path.join(__dirname, '..', 'db')
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
    //文件写入成功。
    res.send({
      data: JSON.parse(data),//返回一个JSON
      code: 1,
      msg: ''
    })

  })
})


//删除
router.post('/remove', (req, res, next)=>{
  // console.log(req.body,'post Body')
  const dbPath = path.join(__dirname, '..', 'db')
  const taskID = req.body?.taskID;
  if (!taskID) {
    res.send({
      data: [],
      code: 0,
      msg: '非法任务ID'
    });
    return
  }
  const dbFile = `${dbPath}\\DOING.json`

  fs.readFile(dbFile, 'utf8', (err, dataStr) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err
      });
      return;
    }
    const data = dataStr ? JSON.parse(dataStr) : []
    const removeTarget = data.find(i => i.taskID === taskID)
    if (!data.length || !removeTarget) {
      res.send({
        data: [],
        code: 0,
        msg: '无效任务ID'
      });
      return
    }
    //到这里一定是有数据并且查到了那个
    // console.log(removeTarget, '115')
    const newData = data.filter(i => i.taskID !== taskID)
    const newDataStr = JSON.stringify(newData)
    fs.writeFile(dbFile, newDataStr, wErr => {
      if (wErr) {
        res.send({
          data: [],
          code: 0,
          msg: wErr
        });
        return
      }
      //文件写入成功。
      // console.log(res,'res')
      res.send({
        code: 1,
        msg: ''
      })
      // console.log(res.code)
      // return 
    })
  })

});

module.exports = router;
