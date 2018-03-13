import { types as t } from 'mobx-state-tree';
const AppSettings = t
  .model({
    advancedMode: t.boolean,
    selectedMenuItem: t.string,
    dataFetched: false
  })
  .actions((self) => ({
    selectMenuItem: (newMenuItem) => (self.selectedMenuItem = newMenuItem),
    toggleAdvancedMode: (mode) => (self.advancedMode = mode),
    dataLoaded: () => { self.dataFetched=true}
  })).views((self) => ({
    get isLoaded () {
      return self.dataFetched;
    }
  }));

export const appSettings = AppSettings.create({
  advancedMode: false,
  selectedMenuItem: 'General'
});
if (process.env.NODE_ENV !== 'production') {
  window['appSettings'] = appSettings;
}
