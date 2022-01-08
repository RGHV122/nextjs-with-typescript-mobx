import { isServer } from 'utils/isServer';
import UIStore from './UIStore';
import React, { createContext, useContext, PropsWithChildren } from 'react'
import { configure } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite'
let clientSideStores: {
  uiStore: UIStore;
};

configure({ enforceActions: 'always' })

const getNewStoreObject = ()=>{
  return {
    uiStore: new UIStore()
  }
}


export const getStores = () => {
  if (isServer) {
    return getNewStoreObject()
  }
  if (!clientSideStores) {
    clientSideStores = getNewStoreObject()
  }
  return clientSideStores
}
type StoreContextType = ReturnType<typeof getStores>;
const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: PropsWithChildren<{}>) => {
  const store = useLocalObservable(getStores);
  return <StoreContext.Provider value={store}> {children} </StoreContext.Provider>;
}

export function useMobxStores() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useMobxStore must be used within a storeProvider")
  }
  return store
}
