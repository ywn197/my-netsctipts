//This script run a sctipt on the server you have root acccess(Excluding purchased servers.).
/** @param {NS} ns */
let ns;
export async function main(_ns) {
    ns = _ns;
    if(ns.args <= 0){
        ns.tprint("please tyep a script name to run in argument");
        return;
    }

    let script = ns.args[0];
    let serverList = await createHostList("home","false-image-server");

    for(let i in serverList){
        let th = ns.getServerMaxRam(serverList[i]) / ns.getScriptRam(script);
        if(th <= 0){
            ns.tprint("Server " + serverList[i] + " can't run this script becouse its ram is too small");
            continue;
        }
        ns.exec(script,serverList[i],th);
    }
    

}

async function createHostList(host,connectFrom) {
    //get server list from $host,and save it in $gotList
    
    let list = []; //server list
    let gotList = ns.scan(host);
    
    //Delete source server
    for(let i = 0;i < gotList.length;i ++){
        if (gotList[i] == connectFrom){ 
            gotList.splice(i,1);
            i --;
        } else if (ns.getServerMaxMoney(gotList[i]) === 0){ 
            gotList.splice(i,1);
            i --;
        } else if (!ns.hasRootAccess(gotList[i])){ 
             gotList.splice(i,1);
             i --;
        }

    }
    list = list.concat(gotList);
    for(const i in gotList){
       list = list.concat(await createHostList(gotList[i],host)); 
    }
    
    return(list);
}
