import { observable, computed, action } from "mobx";

export default class PTFeederStore {
	config = observable({
		test: "test"
	});
}
