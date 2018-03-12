import { History } from 'history';
import { RouterStore, componentDefinitions, settings, appSettings} from '.';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  return {
    "settings": settings,
    "componentDefinitions": componentDefinitions,
    "router": routerStore,
    "appSettings": appSettings
  };
}
