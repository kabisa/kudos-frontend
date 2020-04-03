import React, { ChangeEvent, Component } from 'react';
import { Form, Label, Segment } from 'semantic-ui-react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Storage } from '../../../../support/storage';
import settings from '../../../../config/settings';

import s from '../../FeedPage.module.scss';

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
    guidelines: {
      id: string;
      kudos: number;
      name: string;
    }[];
  };
}

export interface Props {
  handleChange: any;
  amountError: boolean;
}

export interface State {
  amount: string;
  inputFocus: boolean;
}

class GuidelineInput extends Component<Props, State> {
  initialState: State;

  // @ts-ignore
  timeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.state = {
      amount: '',
      inputFocus: false,
    };
    this.initialState = this.state;

    this.focusKudoInput = this.focusKudoInput.bind(this);
    this.blurKudoInput = this.blurKudoInput.bind(this);
    this.selectGuideline = this.selectGuideline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(e: ChangeEvent, { value }: any) {
    this.setState({ amount: value });
    this.props.handleChange(value);
  }

  focusKudoInput() {
    this.setState({ inputFocus: true });
  }

  blurKudoInput() {
    this.setState({ inputFocus: false });
  }

  selectGuideline(amount: string) {
    clearTimeout(this.timeout);
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
              data-testid="amount-input"
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
                    {loading && 'Loading...'}
                    {error && error.message}
                  </Segment>
                </Segment.Group>
              );
            }

            if (!data || !data.teamById || data.teamById.guidelines.length === 0) {
              return (
                <Segment.Group size="tiny" className={s.guidelines}>
                  <Segment key={1}>No guidelines available</Segment>
                </Segment.Group>
              );
            }

            // eslint-disable-next-line max-len
            const filteredGuidlines = data.teamById.guidelines.filter((guideline) => guideline.kudos - KUDO_GUIDELINE_RANGE < (this.state.amount || 0)
                        && guideline.kudos + KUDO_GUIDELINE_RANGE > (this.state.amount || 0));

            return (
              <Segment.Group size="tiny" className={s.guidelines}>
                {filteredGuidlines.map((guideline) => (
                  <Segment
                    data-testid="guideline-row"
                    key={guideline.id}
                    onClick={() => this.selectGuideline(guideline.kudos.toString())}
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
