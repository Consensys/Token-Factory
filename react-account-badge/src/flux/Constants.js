var counter = 0;

module.exports = {
    ADD_NODE_ADDRESSES:           counter++,
    NEW_NODE_ADDRESS:             counter++,
    NEW_LW_ADDRESS:               counter++,
    NEW_LIGHT_WALLET:             counter++,
    NEW_LIGHT_WALLET_ENTROPY:     counter++,
    LOAD_LIGHT_WALLET_FROM_SEED:  counter++,
    DESERIALIZE_LIGHT_WALLET:     counter++,
    REMOVE_LW_FROM_LOCAL_STORAGE: counter++,
    RETRIEVE_SEED:                counter++,
    SELECTED_ADDRESS:             counter++,

    LOCAL_STORAGE_NAME: 'account-manager-light-wallet',
};
