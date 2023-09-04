import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import settings from "../../../../config/settings";
import { getGraphqlError } from "../../../../support";
import {
  CREATE_GUIDELINE,
  CreateGuidelineParameters,
  GET_GUIDELINES,
  UPDATE_GUIDELINE,
} from "./GuidelinesSection";
import { Storage } from "../../../../support/storage";
import { Button, Input, Label } from "@sandercamp/ui-components";
import { Component } from "react";

export interface EditGuidelineProps {}

export interface EditGuidelineState {
  editing: boolean;
  kudos: string;
  description: string;
  error: string;
  editDescription: string;
  editKudos: string;
  editId: number;
}

export class EditGuideline extends Component<
  EditGuidelineProps,
  EditGuidelineState
> {
  initialState: EditGuidelineState;

  constructor(props: EditGuidelineProps) {
    super(props);

    this.state = {
      editing: false,
      kudos: "",
      description: "",
      error: "",

      editDescription: "",
      editKudos: "",
      editId: -1,
    };
    this.initialState = this.state;

    this.createGuideline = this.createGuideline.bind(this);
    this.updateGuideline = this.updateGuideline.bind(this);
    this.setEditState = this.setEditState.bind(this);
  }

  setEditState(id: number, kudos: string, description: string) {
    this.setState({
      editing: true,
      editId: id,
      editKudos: kudos,
      editDescription: description,
    });
  }

  createGuideline(mutate: any) {
    this.setState({ error: "" });
    mutate({
      variables: {
        name: this.state.description,
        kudos: Number(this.state.kudos),
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  updateGuideline(mutate: any) {
    mutate({
      variables: {
        guideline: this.state.editId,
        name: this.state.editDescription,
        kudos: Number(this.state.editKudos),
      },
    });
  }

  render() {
    return (
      <Mutation<CreateGuidelineParameters>
        mutation={this.state.editing ? UPDATE_GUIDELINE : CREATE_GUIDELINE}
        onCompleted={() => {
          this.setState(this.initialState);
          toast.info(
            this.state.editing
              ? "Guideline successfully updated!"
              : "Guideline created successfully!",
          );
        }}
        refetchQueries={[
          {
            query: GET_GUIDELINES,
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
            },
          },
        ]}
      >
        {(mutate, { error, loading }) => {
          let displayError;
          if (error) {
            displayError = getGraphqlError(error);
          }
          if (this.state.error) {
            displayError = this.state.error;
          }
          return (
            <form
              onSubmit={() =>
                this.state.editing
                  ? this.updateGuideline(mutate)
                  : this.createGuideline(mutate)
              }
            >
              <Label htmlFor={this.state.editing ? "editKudos" : "kudos"}>
                Amount of kudos
              </Label>
              <Input
                data-testid="kudo-input"
                placeholder="Kudos"
                type="number"
                min="1"
                max="1000"
                name={this.state.editing ? "editKudos" : "kudos"}
                required
                value={
                  this.state.editing ? this.state.editKudos : this.state.kudos
                }
                onChange={(e) => {
                  this.state.editing
                    ? this.setState({ editKudos: e.target.value })
                    : this.setState({ kudos: e.target.value });
                }}
              />

              <Label
                htmlFor={this.state.editing ? "editDescription" : "description"}
              >
                Description
              </Label>
              <Input
                data-testid="description-input"
                required
                name={this.state.editing ? "editDescription" : "description"}
                placeholder="Description"
                value={
                  this.state.editing
                    ? this.state.editDescription
                    : this.state.description
                }
                onChange={(e) => {
                  this.state.editing
                    ? this.setState({ editDescription: e.target.value })
                    : this.setState({ description: e.target.value });
                }}
              />
              <Button
                data-testid="submit-button"
                variant="primary"
                disabled={loading}
                type="submit"
              >
                {this.state.editing ? "Update guideline" : "Create guideline"}
              </Button>
              {this.state.editing && (
                <Button
                  data-testid="cancel-button"
                  variant="secondary"
                  onClick={() => {
                    this.setState({ editing: false });
                  }}
                >
                  Cancel
                </Button>
              )}
              {displayError && (
                <div className="errorMessage">
                  <h3>Unable to create guideline.</h3>
                  <p>{displayError}</p>
                </div>
              )}
            </form>
          );
        }}
      </Mutation>
    );
  }
}
