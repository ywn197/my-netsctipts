//This script runs a sctipt on the server you have purchased.
/** @param {NS} ns */
export async function main(ns) {
    let sctipt = ns.args[0];
    let serverList = ns.getPurchasedServers();
    for(let i in serverList){
        let th = ns.getServerMaxRam(serverList[i]) / ns.getScriptRam(sctipt);
        if(th <= 0){
            ns.tprint("server " + serverList[i] + " can't run this script because its ram is too small");           
            continue;
       }
        ns.exec(sctipt,serverList[i],385);
    }
}
