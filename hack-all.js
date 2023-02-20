/** @param {NS} ns */
let ns;
export async function main(_ns) {
    ns = _ns;

    let hostsList = await createHostList("home", "NullUndifindServer");

    ns.tprint("(" + hostsList.length + " host(s)) \n" + hostsList);

    await hakking(hostsList);

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

async function hakking(list) {
    let last_run_operations = new Array(list.length);
    last_run_operations.fill("hack");
    while (1) {
        for (const i in list) {
            let target = list[i];
            let maxMoney =  ns.getServerMaxMoney(target);
            let canGetMoney =  ns.getServerMoneyAvailable(target);
            let minSecurity = ns.getServerMinSecurityLevel(target);
            let nowSecurity = ns.getServerSecurityLevel(target);
            
            switch (last_run_operations[i]) {
                case "hack":
                    if (maxMoney * 0.5 > canGetMoney) {
                        await ns.grow(target);
                        last_run_operations[i] = "grow";
                    } else if (minSecurity * 2 < nowSecurity) {
                        await ns.weaken(target);
                        last_run_operations[i] = "weaken";
                    } else {
                        await ns.hack(target);
                        last_run_operations[i] = "hack";
                    }
                    break;
                case "grow":
                    if (maxMoney * 0.8 > canGetMoney) {
                        await ns.grow(target);
                        last_run_operations[i] = "grow";
                    } else if (minSecurity * 2 < nowSecurity) {
                        await ns.weaken(target);
                        last_run_operations[i] = "weaken";
                    } else {
                        await ns.hack(target);
                        last_run_operations[i] = "hack";
                    }
                    break;
                case "weaken":
                    if(minSecurity * 1.5 < nowSecurity) {
                        await ns.weaken(target);
                        last_run_operations[i] = "weaken";
                    }else if(maxMoney * 0.5 > canGetMoney){
                        await ns.grow(target);
                        last_run_operations[i] = "grow";
                    }else {
                        await ns.hack(target);
                        last_run_operations[i] = "hack";
                    }
                    break;
            }
        }
    }

}
