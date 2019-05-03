import {action, observable} from "mobx";


class CounterStore {
    @observable count = 0;

    constructor(){
    }

    @action.bound
    add(){
        this.count += 1;
    }

    @action.bound
    minus(){
        this.count -= 1;
    }
}

export default new CounterStore();