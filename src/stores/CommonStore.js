import {action, observable} from "mobx";


class CommonStore {
    @observable internetConnection = true;

    constructor(){
    }

    @action.bound
    onChangeInternetState(state){
        this.internetConnection = state;
    }
}

export default new CommonStore();