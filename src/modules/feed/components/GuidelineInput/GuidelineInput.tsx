import { ChangeEvent, Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import enhanceWithClickOutside from "react-click-outside";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";

import { Label } from "@sandercamp/ui-components";
import Select, { SingleValue } from "react-select";

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
  amount: number;
}

export type GuidelineOption = { label: string; value: number };

class GuidelineInput extends Component<Props, State> {
  initialState: State;

  // @ts-ignore
  timeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.state = {
      amount: 0,
    };
    this.initialState = this.state;

    this.selectGuideline = this.selectGuideline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ amount: parseInt(e.target.value) });
    this.props.handleChange(parseInt(e.target.value));
  }

  selectGuideline(e: SingleValue<GuidelineOption>) {
    if (e?.value) {
      this.setState({ amount: e.value });
      this.props.handleChange(e.value);
    }
  }

  resetState() {
    this.setState(this.initialState);
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
                    value: guideline.kudos,
                  }));
              } else {
                guidelines = data.teamById.guidelines.map((guideline) => ({
                  label: `${guideline.name}: ${guideline.kudos}`,
                  value: guideline.kudos,
                }));
              }
            }

            return (
              <Label>
                Kudos amount
                <Select<GuidelineOption, false>
                  options={guidelines}
                  onChange={(e) => this.selectGuideline(e)}
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
