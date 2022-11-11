import localForage from "localforage";
import {proxy} from 'valtio';

const state = proxy(localForage.getItem('MQlab'));

export const setState = (newState) => {
    localForage.setItem('MQlab', newState)
    state.wvaltio=newState;
};

export default state;