import { fireEvent, queryByAttribute } from "@testing-library/react";

const DOWN_ARROW = { keyCode: 40 };

const getDomAreaOfSelect = (
  selectElement: HTMLElement,
): HTMLElement | undefined | null =>
  selectElement.parentElement?.parentElement?.parentElement?.parentElement;

export const openSelect = (selectElement: HTMLElement): void => {
  fireEvent.keyDown(selectElement, DOWN_ARROW);
};

/**
 * Helper to retrieve all selection options of a 'react-select' element
 * This allows for selecting an option by its index instead of a name.
 */
export const getSelectOptions = (selectElement: HTMLElement): HTMLElement[] => {
  const selectId = selectElement.getAttribute("id");
  const selectPrefix = selectId?.slice(0, -6);
  const options: HTMLElement[] = [];
  const domArea = getDomAreaOfSelect(selectElement);

  let found = true;
  while (found && domArea) {
    const option = queryByAttribute(
      "id",
      domArea,
      `${selectPrefix}-option-${options.length}`,
    );
    found = false;
    if (option !== null) {
      options.push(option);
      found = true;
    }
  }
  return options;
};

export const getSelectedItemsText = (selectElement: HTMLElement): string => {
  const domArea = getDomAreaOfSelect(selectElement);
  return domArea?.textContent ?? "";
};
