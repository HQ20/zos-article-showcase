module.exports = {

    // Define networks
    networks: {
        local: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.0",
        }
    }
}
