class Config {
    constructor(debugMode: boolean) {
        this.debugMode = debugMode;
    }

    readonly debugMode: boolean;
}

let GlobalConfig = new Config(false);

function debug(log: string) {
    if (GlobalConfig.debugMode) {
        console.log(`DEBUG: ${log}`);
    }
}

export { debug };
