import React, { Component } from "react";
import { Form, Segment, Label } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import settings from "../../../../config/settings";

import s from "../../AddTransactionPage.module.scss";

const KUDO_GUIDELINE_RANGE = 5;
const GUIDELINE_HIDE_DELAY = 250;

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

class GuidelineInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
    };
    this.initialState = this.state;

    // eslint-disable-next-line no-unused-expressions
    this._timeoutID;

    this.focusKudoInput = this.focusKudoInput.bind(this);
    this.blurKudoInput = this.blurKudoInput.bind(this);
    this.selectGuideline = this.selectGuideline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ amount: value });
    this.props.handleChange(value);
  }

  focusKudoInput() {
    this.setState({ inputFocus: true });
  }

  blurKudoInput() {
    this._timeoutID = setTimeout(
      () => this.setState({ inputFocus: false }),
      GUIDELINE_HIDE_DELAY
    );
  }

  selectGuideline(amount) {
    clearTimeout(this._timeoutID);
    this.setState({ amount, inputFocus: false });
    this.props.handleChange(amount);
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <div>
        <Form.Field>
          <label htmlFor="input-kudos">
            Kudos Amount
            <Form.Input
              id="input-kudos"
              error={this.props.amountError}
              onChange={this.handleChange}
              onFocus={this.focusKudoInput}
              onBlur={this.blurKudoInput}
              placeholder="Amount of kudos"
              name="amount"
              type="number"
              min="0"
              value={this.state.amount}
              labelPosition="left"
            >
              <Label basic>₭</Label>
              <input />
            </Form.Input>
          </label>
        </Form.Field>

        {this.state.inputFocus && this.state.amount && (
          <Query
            query={GET_GUIDELINES}
            variables={{
              team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            }}
          >
            {({ loading, error, data }) => {
              if (loading || error) {
                return (
                  <Segment.Group size="tiny" className={s.guidelines}>
                    <Segment>
                      {loading && "Loading..."}
                      {error && `Error! ${error.message}`}
                    </Segment>
                  </Segment.Group>
                );
              }
              return (
                <Segment.Group size="tiny" className={s.guidelines}>
                  {data.teamById.guidelines
                    .filter(
                      guideline =>
                        guideline.kudos - KUDO_GUIDELINE_RANGE <
                          (this.state.amount || 0) &&
                        guideline.kudos + KUDO_GUIDELINE_RANGE >
                          (this.state.amount || 0)
                    )
                    .map(guideline => (
                      <Segment
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

export default GuidelineInput;
