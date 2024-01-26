import { NameOption } from "../components/UserDropdown/UserDropdown";

export type CreatePostState = {
  amount?: number;
  receivers: readonly NameOption[];
  images?: File[];
  message: string;
};
