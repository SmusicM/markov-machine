/** Command-line tool to generate Markov text. */
const{MarkovMachine}=require('./markov');
const fs = require('fs');
const axios = require('axios');
const argv = process.argv

const txtfile = process.argv[3]
const urlinput = process.argv[3]


for(let i = 0; i<argv.length;i+=1){
    console.log(i,argv[i])
 }

 function isurl(s){
    //checks if url
    try{
       new URL(s);
        return true
    }catch(err){
        console.log("Is not a URL at isurl",s)
        //cat2(urlinput)
      return false
    }
}

function genmarkov(txtfile){
    //reads file and uses maketext func from markov model pases data from read file
    fs.readFile(txtfile,'utf8',(err,data) =>{
    if(err){
        console.log("Error at genmarkov readfile:",err)
        console.log("Error code at genmarkov:",err.code)
        process.kill(1)
    }
    let mm = new MarkovMachine(data)
    console.log(mm.makeText())
})
}


async function genmarkovurl(urlinput){
    try{
        //reads url and uses maketext func from markov model pases data from url into it
        let res = await axios.get(`${urlinput}`)
               //console.log(res.data)
               console.log(res.status) 
              // console.log(data)
               let mm = new MarkovMachine(res.data)
               console.log(mm.makeText())
        }catch(e){
             console.log('Error with url:',e.code,'Response error: ',e.response.status)
             console.log('Response error: ',e.response.status)
        }
    }
    
    //looks for if arg at index 2 is url or file so it knows what use for executing function
    if(argv[2].includes('file') && !isurl(urlinput)){
        genmarkov(txtfile)
      }else if(argv[2].includes('url')){
          genmarkovurl(urlinput)
        console.log ("hey there url")
      }
      
      