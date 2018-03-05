import { action, observable } from "mobx";
import { config } from "./config/config.json";

class Store {
  @observable options = config;

  @action
  doSomething = () => {
    return "blah";
  };
}

export default new Store();
