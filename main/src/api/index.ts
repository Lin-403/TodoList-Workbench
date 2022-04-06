//封装一个简单的fetch方法
// 传入一个url参数，fetch会对这个url资源路径进行访问
// 并返回一个一个包含http响应结果（response对象）的promise
// 对这个结果进行.json()处理成JSPN文件形式

const localServer='http://127.0.0.1:3000'

const api=(url:string)=>{
    return fetch(localServer + url).then((response)=>response.json());
}

//封装带参数的get请求
const getApi =(url:string,data:any)=>{
   
    const queryString=Object.entries(data).map(i=>
        `${i[0]}=${i[1]}`
    )

    return fetch(localServer+url+`?${queryString}`).then(response=>response.json());
}

const postApi=(url:string,data:any)=>{
    return fetch(localServer+url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    }).then(response=>response.json())
}

export {api,getApi,postApi}