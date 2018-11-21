import { h, Component } from "preact";
import { Form, Segment, Label } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import s from "../../AddTransactionPage.scss";

const KUDO_GUIDELINE_RANGE = 5;
const GUIDELINE_HIDE_DELAY = 250;

export const GET_GUIDELINES = gql`
  query Guidelines {
    guidelines {
      id
      kudos
      name
    }
  }
`;

class GuidelineInput extends Component {
  constructor(props) {
    super(props);

    this._timeoutID;

    this.focusKudoInput = this.focusKudoInput.bind(this);
    this.blurKudoInput = this.blurKudoInput.bind(this);
    this.selectGuideline = this.selectGuideline.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

        {this.state.inputFocus && (
          <Query query={GET_GUIDELINES}>
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
                  {data.guidelines
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
