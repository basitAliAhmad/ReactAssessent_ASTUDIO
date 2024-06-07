import React, {createContext, ReactNode, useState} from "react";
import {NetworkContextProps, NetworkState} from "../types";


export const NetworkStateContext = createContext<NetworkContextProps | undefined>(undefined);

export const NetworkStateContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    const initialState: NetworkState = {
        count: 0, offset: 0,
        currentPage: 0,
        data: undefined,
        total: 0,
        totalPages: 0,
        status: 'initial'
    };

    const [appState, setAppState] = useState<NetworkState>(initialState);

    return (
        <NetworkStateContext.Provider value={{networkState: appState, setNetworkState: setAppState}}>
            {children}
        </NetworkStateContext.Provider>
    );

};