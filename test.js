function slotbook(requests){
const accepted = new Set()
const finalaccepted = []
const reject = []

for(let req of requests){
    const key  = `${req.slotId}`
    // const key  = `${req.slotId}-${req.timestamp}`
    if(!accepted.has(key)){
        accepted.add(key)
        if(req.timestamp <)
        finalaccepted.push(req)
    }else{
        reject.push(req)
    }
}

return {accepted:finalaccepted,reject}
}



