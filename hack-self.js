//This script hacks the server running this script.(some times it runs weaken() and grow())
/** @param {NS} ns */
let ns;
export async function main(_ns) {
	ns = _ns;
	let host = await ns.getHostname();
	let last_run_operations = "hack";

	let maxMoney =  await ns.getServerMaxMoney(host);
	let minSecurity = await ns.getServerMinSecurityLevel(host);

            
    while (1) {
		let canGetMoney = await ns.getServerMoneyAvailable(host);
		let nowSecurity = await ns.getServerSecurityLevel(host);
            switch (last_run_operations ) {
                case "hack":
                    if (maxMoney * 0.5 > canGetMoney) {
                        await growing(host);
                        last_run_operations  = "grow";
                    } else if (minSecurity * 2 < nowSecurity) {
                        await weakening(host);
                        last_run_operations  = "weaken";
                    } else {
                        await hacking(host);
                        last_run_operations  = "hack";
                    }
                    break;
                case "grow":
                    if (maxMoney * 0.8 > canGetMoney) {
                        await growing(host);
                        last_run_operations  = "grow";
                    } else if (minSecurity * 2 < nowSecurity) {
                        await weakening(host);
                        last_run_operations  = "weaken";
                    } else {
                        await hacking(host);
                        last_run_operations  = "hack";
                    }
                    break;
                case "weaken":
                    if(minSecurity * 1.5 < nowSecurity) {
                        await weakening(host);
                        last_run_operations  = "weaken";
                    }else if(maxMoney * 0.5 > canGetMoney){
                        await growing(host);
                        last_run_operations  = "grow";
                    }else {
                        await hacking(host);
                        last_run_operations  = "hack";
                    }
                    break;
            }
    }
}

async function hacking(host){
	await ns.hack(host)
}
async function growing(host){
	await ns.grow(host)
}
async function weakening(host){

	await ns.weaken(host);
}
