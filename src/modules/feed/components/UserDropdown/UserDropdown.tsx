import { PropsWithRef, useEffect } from "react";

import { useQuery } from "@apollo/client";
import CreatableSelect from "react-select/creatable";
import { GET_USERS } from "../../../../common/graphql/queries/getUsers.graphql";
import settings from "../../../../config/settings";
import { Storage } from "../../../../support/storage";

export interface DropDownProps extends PropsWithRef<any> {
  onChange: (values: readonly NameOption[]) => void;
  error: boolean;
}

export interface DropDownState {
  values: readonly NameOption[];
}

type _DropDownProps = {
  onChange?: (values: readonly NameOption[]) => void;
  onCreate?: (input: string) => void;
  receivers: readonly NameOption[];
};

export type NameOption = { label: string; value: string };

const UserDropdown = ({ receivers, onCreate, onChange }: _DropDownProps) => {
  const { loading, data } = useQuery(GET_USERS, {
    variables: {
      team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
    },
  });

  return (
    <CreatableSelect
      isClearable
      options={
        !loading &&
        data.teamById.users.map((item: any) => ({
          label: item.virtualUser ? `${item.name} (v)` : item.name,
          value: item.id,
        }))
      }
      isMulti
      onCreateOption={onCreate}
      onChange={onChange}
      value={receivers}
      isLoading={loading}
      isDisabled={loading}
      placeholder="Receivers"
      data-testid="user-dropdown"
      classNamePrefix="react-select"
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
    />
  );
};
export default UserDropdown;
