import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import enhanceWithClickOutside from "react-click-outside";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";

import { Label } from "@kabisa/ui-components";
import Select from "react-select";
import type { ActionMeta, SingleValue } from "react-select";

const KUDO_GUIDELINE_RANGE = 5;

export const GET_GUIDELINES = gql`
  query Guidelines($team_id: ID!) {
    teamById(id: $team_id) {
      guidelines {
        id
        kudos
        name
      }
    }
  }
`;

export interface GetGuideLinesResult {
  teamById: {
    guidelines: Guideline[];
  };
}

export interface Guideline {
  id: string;
  kudos: number;
  name: string;
}

export interface Props {
  handleChange: any;
  amountError: boolean;
}

export interface State {
  id: string;
  value: string;
  amount: number;
}

export type GuidelineOption = { label: string; value: string };

class GuidelineInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: "",
      value: "",
      amount: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(
    e: SingleValue<GuidelineOption>,
    triggeredAction: ActionMeta<GuidelineOption>,
  ) {
    if (triggeredAction.action === "clear") {
      this.resetState();
      this.props.handleChange(0);
    } else {
      if (!e?.value) return;

      const kudosValue = parseInt(e.value.split("-")[1], 10); // Parsing the kudos value
      this.setState({ amount: kudosValue, id: uuidv4() });
      this.props.handleChange(kudosValue);
    }
  }

  resetState() {
    this.setState({ id: "", value: "", amount: 0 });
  }

  render() {
    return (
      <div id="kudos-input-container">
        <Query<GetGuideLinesResult>
          query={GET_GUIDELINES}
          variables={{
            team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
          }}
        >
          {({ loading, data }) => {
            let guidelines: GuidelineOption[] = [];

            if (data && data.teamById.guidelines.length > 0) {
              if (this.state.amount) {
                guidelines = data.teamById.guidelines
                  .filter(
                    (guideline) =>
                      guideline.kudos - KUDO_GUIDELINE_RANGE <
                        (this.state.amount || 0) &&
                      guideline.kudos + KUDO_GUIDELINE_RANGE >
                        (this.state.amount || 0),
                  )
                  .map((guideline) => ({
                    label: `${guideline.name}: ${guideline.kudos}`,
                    value: `${guideline.id}-${guideline.kudos}`,
                  }));
              } else {
                guidelines = data.teamById.guidelines.map((guideline) => ({
                  label: `${guideline.name}: ${guideline.kudos}`,
                  value: `${guideline.id}-${guideline.kudos}`,
                }));
              }
            }

            return (
              <Label>
                Kudos amount
                <Select<GuidelineOption>
                  key={`react-select-${uuidv4()}`}
                  options={guidelines}
                  onChange={(selectedOption, triggeredAction) => {
                    this.handleChange(selectedOption, triggeredAction);
                  }}
                  value={
                    this.state.amount && this.state.amount !== 0
                      ? {
                          label: this.state.amount.toString(),
                          // It seems React-select is not able to handle
                          // the same value twice, so we add a unique id to the value
                          value: `${this.state.id}-${this.state.amount}`,
                        }
                      : undefined
                  }
                  isLoading={loading}
                  isDisabled={loading}
                  placeholder="Kudos amount"
                  styles={{
                    valueContainer: (base) => ({
                      ...base,
                      fontSize: "var(--font-size-s)",
                    }),
                    control: (base) => ({
                      ...base,
                      border: ".1rem solid var(--subtle-color)",
                    }),
                  }}
                  isClearable
                  autoFocus
                />
              </Label>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default enhanceWithClickOutside(GuidelineInput);
