import React, { ChangeEvent, Component } from "react";
import { Form, Segment } from "semantic-ui-react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import enhanceWithClickOutside from "react-click-outside";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";

import s from "./GuidelineInput.module.scss";

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

  handleChange(e: ChangeEvent, { value }: any) {
    this.setState({ amount: String(value) });
    this.props.handleChange(Number(value));
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
        <Form.Field className={s.field}>
          <Form.Input
            className={
              this.state.showGuidelines ? s.guideline_input_active : ""
            }
            data-testid="amount-input"
            id="input-kudos"
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
            label="Kudos Amount"
            action={{
              icon: "info",
              onClick: this.showGuidelines,
              "data-testid": "guidelines-button",
              className: s.info_button,
            }}
          />
        </Form.Field>

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
                  <Segment.Group size="tiny" className={s.guidelines}>
                    <Segment>
                      {loading && "Loading..."}
                      {error && error.message}
                    </Segment>
                  </Segment.Group>
                );
              }

              if (
                !data ||
                !data.teamById ||
                data.teamById.guidelines.length === 0
              ) {
                return (
                  <Segment.Group size="tiny" className={s.guidelines}>
                    <Segment key={1}>No guidelines available</Segment>
                  </Segment.Group>
                );
              }

              let guidelines: Guideline[];

              if (this.state.amount) {
                // eslint-disable-next-line max-len
                guidelines = data.teamById.guidelines.filter(
                  (guideline) =>
                    guideline.kudos - KUDO_GUIDELINE_RANGE <
                      (this.state.amount || 0) &&
                    guideline.kudos + KUDO_GUIDELINE_RANGE >
                      (this.state.amount || 0)
                );
              } else {
                guidelines = data.teamById.guidelines;
              }

              if (guidelines.length === 0) {
                return (
                  <Segment.Group size="tiny" className={s.guidelines}>
                    <Segment key={1}>No guidelines available</Segment>
                  </Segment.Group>
                );
              }

              return (
                <Segment.Group size="tiny" className={s.guidelines}>
                  {guidelines.map((guideline) => (
                    <Segment
                      data-testid="guideline-row"
                      key={guideline.id}
                      onClick={() => this.selectGuideline(guideline.kudos)}
                    >
                      {`${guideline.kudos}: ${guideline.name}`}
                    </Segment>
                  ))}
                </Segment.Group>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default enhanceWithClickOutside(GuidelineInput);
