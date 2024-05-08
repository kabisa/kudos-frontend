import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import enhanceWithClickOutside from "react-click-outside";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";

import { Label } from "@kabisa/ui-components";
import CreatableSelect from "react-select/creatable";
import type { ActionMeta, SingleValue } from "react-select";
import { GET_GUIDELINES } from "../../../manage-team/sections/guideline/GuidelinesSection";

const KUDO_GUIDELINE_RANGE = 5;

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

export type GuidelineOption = { label: string; value: string; id: string };

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

      const kudosValue = parseInt(e.value, 10);

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
                    id: guideline.id,
                    label: `${guideline.name}: ${guideline.kudos}`,
                    value: guideline.kudos.toString(),
                  }));
              } else {
                guidelines = data.teamById.guidelines.map((guideline) => ({
                  id: guideline.id,
                  label: `${guideline.name}: ${guideline.kudos}`,
                  value: guideline.kudos.toString(),
                }));
              }
            }

            return (
              <Label>
                Kudos amount
                <CreatableSelect<GuidelineOption>
                  key={"select"}
                  options={guidelines}
                  onChange={(selectedOption, triggeredAction) => {
                    this.handleChange(selectedOption, triggeredAction);
                  }}
                  value={
                    this.state.amount && this.state.amount !== 0
                      ? {
                          label: this.state.amount.toString(),
                          id: this.state.id,
                          value: this.state.amount.toString(),
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
