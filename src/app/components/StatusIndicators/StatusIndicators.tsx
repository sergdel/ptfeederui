import { Segment, Label } from "semantic-ui-react";
import * as React from "react";
import { CLIENTONLY } from "app/constants";
import { inject, observer } from "mobx-react";
import { APP_SETTINGS, SETTINGS } from "app/constants/stores";
export const StatusIndicators: React.SFC<any> = inject(APP_SETTINGS, SETTINGS)(
  observer(
    ({
      BaseCoinPrice,
      CurrentMarketCondition,
      TopCoinChange,
      settings: { snapshot },
      appSettings: { connected, getSettingsFromLS }
    }) => {
      return (
        <Segment basic floated="right">
          {connected ? (
            <Label circular color={"green"}>
              Connected
            </Label>
          ) : (
            <Label circular color={"red"}>
              Offline
            </Label>
          )}
          {CLIENTONLY && (
            <Label circular color={"blue"}>
              Debug
            </Label>
          )}
          <Label>
            BaseCoinPrice <Label.Detail>{BaseCoinPrice || 0}</Label.Detail>
          </Label>
          <Label>
            CurrentMarketConditions
            <Label.Detail>{CurrentMarketCondition || 0}</Label.Detail>
          </Label>
          <Label>
            TopCoinChangee <Label.Detail>{TopCoinChange || 0}</Label.Detail>
          </Label>
        </Segment>
      );
    }
  )
);
