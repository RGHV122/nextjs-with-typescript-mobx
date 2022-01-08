import { observable, action,makeAutoObservable } from 'mobx';

export default class UIStore {
  
  @observable demo = 1;

  constructor(){
    makeAutoObservable(this)
    console.log("UI store initialized")
  }

  @action setdemo() {
    this.demo = this.demo*2;
    console.log(this.demo)
  }

}

