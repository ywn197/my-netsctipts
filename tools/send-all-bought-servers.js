//This script sends a file to the servers you have purchased.
/** @param {NS} ns */
export async function main(ns) {
    if(ns.args.length === 0)
        ns.tprint("please input file(s) name into argument");
    let fileNames = ns.args;
    let serverList =  ns.getPurchasedServers()

    for(const i in serverList){
        ns.scp(fileNames,serverList[i]);
    }
    ns.tprint("sended");
}
