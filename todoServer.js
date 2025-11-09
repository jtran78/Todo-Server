const http = require('http');
const url = require('url');
const path = require('path');
const port = Number(process.argv[2]); //read the command line argument
var list = []; //to do list

//req handler
let reqHandler = (req, res)=>{
  switch(req.method){ 
    case'POST':
    let item = ''; //step 2 represents to-do items sent by client
    req.setEncoding('utf-8'); //old node js strings would come in as buffers/numbers. Not req. for new node js
    req.on('data', (chunk)=>{
      item += chunk; //concat pieces of string data coming in from client side
    });
    req.on('end', ()=>{ //end handler
      list.push(item); //after concat is finished, add full item to the list
      console.log(list);
      res.end('OK\n');
    })
      break;

    case 'GET':
      if (list.length < 1){
        res.end("Your To-Do list is empty. Well Done!!!");
      }else{
        let output = '';
        list.forEach((element, index)=> {
          output += `${index + 1}) ${element}\n`;
        });
        res.end(output);
        
      }
      break;

    case 'DELETE':
      let path = url.parse(req.url).pathname; //take out url from path name
      let i = path.slice(1); 

      if(i === ''){
        res.end('Missing index for item to be deleted');
        break;
      }

      i = parseInt(i, 10);
      if (isNaN(i) || i < 1 || i > list.length) {
        res.end('Invalid index value');
      } else {
        list.splice(i-1, 1);
        res.statusCode = 200;
        res.end('OK\n');
      }
      break;
     
    case 'PUT':
      let updatedItem = '';
      req.setEncoding('utf-8');
      req.on('data', (chunk) => {
        updatedItem += chunk;
      });
      req.on('end', ()=> {
        let putPath = url.parse(req.url).pathname;
        let putIndex = putPath.slice(1);

        if (putIndex === ''){
          res.end('Missing index for item to be updated');
          return;
        }
        putIndex = parseInt(putIndex, 10);
        if(isNaN(putIndex) || putIndex < 1){
          res.end('Invalid index value');
          return;
        }
        if(putIndex > list.length){
          res.end('Item not found');
          return;
        }

        //update item in list
        list.splice(putIndex - 1, 1, updatedItem);
        res.statusCode = 200;
        res.end('OK\n');
      });
      break;
  }
}
//check if port is missing or less than 3000
if (!port){
  console.log(`Missing Server Port Number\nUsage: node ${path.basename(__filename)} [port number]`);
  //console.log(`Usage: node ${__filename.split('\\').pop()} [port number >= 3000]`);
}
else if (port<3000){
  console.log("Port number must be greater or equal to 3000");
}else{
  //create server
  const server = http.createServer(reqHandler);
  server.listen(port, ()=>{
  console.log(`The server is listening on port ${port}`);
  });
};
