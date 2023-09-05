import { ChangeEvent, Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import enhanceWithClickOutside from "react-click-outside";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";

import s from "./GuidelineInput.module.scss";
import { Input, Label } from "@sandercamp/ui-components";
import Segment from "../../../../components/atoms/Segment";

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
  amount: string;
  showGuidelines: boolean;
}

class GuidelineInput extends Component<Props, State> {
  initialState: State;

  // @ts-ignore
  timeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.state = {
      amount: "",
      showGuidelines: false,
    };
    this.initialState = this.state;

    this.focusKudoInput = this.focusKudoInput.bind(this);
    this.blurKudoInput = this.blurKudoInput.bind(this);
    this.selectGuideline = this.selectGuideline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.showGuidelines = this.showGuidelines.bind(this);
  }

  handleClickOutside() {
    this.setState({
      showGuidelines: false,
    });
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ amount: String(e.target.value) });
    this.props.handleChange(Number(e.target.value));
  }

  showGuidelines(e: Event) {
    e.preventDefault();
    this.setState((prevState) => ({
      showGuidelines: !prevState.showGuidelines,
    }));
  }

  focusKudoInput() {
    this.setState({
      showGuidelines: true,
    });
  }

  blurKudoInput() {
    this.timeout = setTimeout(() => {
      this.setState({
        showGuidelines: false,
      });
    }, 500);
  }

  selectGuideline(amount: number) {
    clearTimeout(this.timeout);
    this.setState({ amount: String(amount), showGuidelines: false });
    this.props.handleChange(Number(amount));
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <div id="kudos-input-container" className={s.test}>
        <Label>
          Kudos amount
          <Input
              className={
                this.state.showGuidelines ? s.guideline_input_active : ""
              }
              data-testid="amount-input"
              error={this.props.amountError}
              onChange={this.handleChange}
              onFocus={this.focusKudoInput}
              onBlur={this.blurKudoInput}
              placeholder="Amount of kudos"
              name="amount"
              type="number"
              autoComplete="off"
              min="1"
              value={this.state.amount}
          />
        </Label>

        {this.state.showGuidelines && (
          <Query<GetGuideLinesResult>
            query={GET_GUIDELINES}
            variables={{
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
            }}
          >
            {({ loading, error, data }) => {
              if (loading || error) {
                return (
                  <div className={s.guidelines}>
                    <Segment>
                      {loading && "Loading..."}
                      {error && error.message}
                    </Segment>
                  </div>
                );
              }

              if (
                !data ||
                !data.teamById ||
                data.teamById.guidelines.length === 0
              ) {
                return (
                  <div className={s.guidelines}>
                    <Segment key={1}>No guidelines available</Segment>
                  </div>
                );
              }

              let guidelines: Guideline[];

              if (this.state.amount) {
                // eslint-disable-next-line max-len
                guidelines = data.teamById.guidelines.filter(
                  (guideline) =>
                    guideline.kudos - KUDO_GUIDELINE_RANGE <
                      (parseInt(this.state.amount) || 0) &&
                    guideline.kudos + KUDO_GUIDELINE_RANGE >
                      (parseInt(this.state.amount) || 0),
                );
              } else {
                guidelines = data.teamById.guidelines;
              }

              if (guidelines.length === 0) {
                return (
                  <div className={s.guidelines}>
                    <Segment key={1}>No guidelines available</Segment>
                  </div>
                );
              }

              return (
                <div className={s.guidelines}>
                  {guidelines.map((guideline) => (
                    <Segment
                      data-testid="guideline-row"
                      key={guideline.id}
                      onClick={() => this.selectGuideline(guideline.kudos)}
                    >
                      {`${guideline.kudos}: ${guideline.name}`}
                    </Segment>
                  ))}
                </div>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default enhanceWithClickOutside(GuidelineInput);
