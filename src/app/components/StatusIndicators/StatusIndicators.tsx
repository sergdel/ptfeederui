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
      appSettings: { connected, getSettingsFromLS, statusIndicators }
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
          {statusIndicators.map((indicator: object, index: number) => {
            return (
              <Label>
                {Object.keys(indicator)}
                <Label.Detail>{Object.values(indicator)}</Label.Detail>
              </Label>
            );
          })}
        </Segment>
      );
    }
  )
);
