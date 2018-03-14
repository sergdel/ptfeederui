import UIConfig from '../config/config.json';
import _ from 'lodash';
import { types as t } from 'mobx-state-tree';
const Config = t
  .model('menuItem', {
    Menu: t.array(
      t.model({
        title: t.string,
        wiki: t.string,
        description: t.optional(t.string, ''),
        advanced: t.optional(t.boolean, false)
      })
    ),
    ComponentTypes: t.array(
      t.model('componentType', {
        title: t.optional(t.string, ''),
        type: t.string,
        options: t.optional(
          t.array(
            t.model('dropdownOption', {
              key: t.optional(t.string, ''),
              text: t.optional(t.string, ''),
              value: t.optional(t.string, ''),
              index: t.optional(t.number, -1)
            })
          ),
          []
        ),
        allowAdditions: t.optional(t.boolean, false),
        required: t.optional(t.boolean, false),
        wiki: t.optional(t.string, ''),
        advanced: t.optional(t.boolean, false)
      })
    )
  })
  .views((self) => ({
    menuItemsMeta(title: string = 'General'): object {
      const menuData = _.find(self.Menu, { title: title });
      console.log (self);
      if (!menuData) {
        console.error('configuration for menu data not found ' + title);
        return { description: '' };
      }
      return menuData;
    },
    componentTypeForFieldName(fieldName: string): string {
      return this.ComponentTypes.find((t) => t.title === fieldName);
    }
  }));

export const componentDefinitions = Config.create(UIConfig);
