import Button from "../Button";

export const actionsTableData = [
  {
    name: "Mumbo-Jumbo",
    role: "moderator",
    email: "mumbo@jumbo.com",
    actions: (
      <>
        <Button variant="primary" icon="arrow_upward" />
        <Button variant="primary" icon="arrow_downward" />
        <Button variant="tertiary" icon="delete" />
      </>
    ),
  },
  {
    name: "Nabnut",
    role: "moderator",
    email: "nabnut@clickclockwood.com",
    actions: (
      <>
        <Button variant="primary" icon="arrow_upward" state="disabled" />
        <Button variant="primary" icon="arrow_downward" />
        <Button variant="tertiary" icon="delete" />
      </>
    ),
  },
  {
    name: "Jolly Roger",
    role: "admin",
    email: "jollyroger@lagoon.com",
    actions: <></>,
  },
];
