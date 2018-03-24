import { types as t } from "mobx-state-tree";
import _ from "lodash";
export const ComponentModel = t
  .model("menuItem", {
    Menu: t.array(
      t.model({
        key: t.string,
        title: t.string,
        wiki: t.string,
        description: t.optional(t.string, ""),
        advanced: t.optional(t.boolean, false),
        fixedItems: t.optional(t.array(t.string), [])
      })
    ),
    ComponentTypes: t.array(
      t.model("componentType", {
        title: t.optional(t.string, ""),
        type: t.string,
        options: t.optional(
          t.array(
            t.model("dropdownOption", {
              key: t.optional(t.string, ""),
              text: t.optional(t.string, ""),
              value: t.optional(t.string, ""),
              index: t.optional(t.number, -1)
            })
          ),
          []
        ),
        allowAdditions: t.optional(t.boolean, false),
        required: t.optional(t.boolean, false),
        wiki: t.optional(t.string, ""),
        advanced: t.optional(t.boolean, false)
      })
    ),
    Offsets: t.optional(t.array(t.string), [])
  })
  .views(self => ({
    menuItemsMeta(key: string = "General"): object {
      const menuData = _.find(self.Menu, { key: key });
      if (!menuData) {
        console.error("configuration for menu data not found " + key);
        return { description: "" };
      }
      return menuData;
    },
    componentTypeForFieldName(fieldName: string): string {
      return this.ComponentTypes.find(t => t.title === fieldName);
    }
  }));
