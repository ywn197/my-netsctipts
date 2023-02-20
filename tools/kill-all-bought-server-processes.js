/** @param {NS} ns */
export async function main(ns) {
    let serverList = ns.getPurchasedServers();
    for(let i in serverList){
        ns.killall(serverList[i]);
    }
}
