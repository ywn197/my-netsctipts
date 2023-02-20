/** @param {NS} ns */
let ns;
export async function main(_ns) {
    ns = _ns;

    let serverList = await createHostList("home","false-image-server");

    for(let i in serverList){
		ns.killall(serverList[i]);	
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
