import { setComponent } from "../../support/testing/testComponent";
import { ImageUpload } from "./ImageUpload";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const createFile = (name: string, size: number, type: string): File => {
  const file = new File([], name, { type });
  Reflect.defineProperty(file, "size", {
    get() {
      return size;
    },
  });
  return file;
};

describe("<ImageUpload />", () => {
  let selectedFiles: any = [];

  const { setProps, renderComponent } = setComponent(ImageUpload);
  setProps({
    onChange: (files) => {
      selectedFiles = files;
    },
  });

  beforeEach(() => {
    window.URL.createObjectURL = jest.fn();
    renderComponent();
  });

  it("can select files", async () => {
    const files = [
      createFile("foo.png", 200, "image/png"),
      createFile("bar.jpg", 200, "image/jpeg"),
    ];

    const uploadField = screen.getByTestId("dropzone").querySelector("input");

    if (!uploadField) {
      expect(uploadField).not.toBeNull();
      return;
    }
    userEvent.upload(uploadField, files);

    await waitFor(() => {
      expect(selectedFiles).toHaveLength(2);
      expect(selectedFiles).toEqual(files);
    });
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("does not accept more than 3 images", async () => {
    const files = [
      createFile("foo.png", 200, "image/png"),
      createFile("bar.jpg", 200, "image/jpeg"),
      createFile("john.jpg", 200, "image/jpeg"),
      createFile("doe.jpg", 500, "image/jpeg"),
    ];
    const uploadField = screen.getByTestId("dropzone").querySelector("input");

    if (!uploadField) {
      expect(uploadField).not.toBeNull();
      return;
    }
    userEvent.upload(uploadField, files);

    await waitFor(() => {
      expect(selectedFiles).toHaveLength(0);
      expect(selectedFiles).toEqual([]);
    });
    expect(screen.queryAllByRole("img")).toHaveLength(0);
    expect(
      screen.getByText(
        "Images not accepted. Select up to 3 images with a maximum size of 5MB",
      ),
    ).toBeInTheDocument();
  });

  it.skip("only accepts images", async () => {
    const files = [createFile("foo.txt", 200, "text/plain")];
    const uploadField = screen.getByTestId("dropzone").querySelector("input");
    if (!uploadField) {
      expect(uploadField).not.toBeNull();
      return;
    }
    userEvent.upload(uploadField, files);

    expect(
      await screen.findByText(
        "Images not accepted. Select up to 3 images with a maximum size of 5MB",
      ),
    ).toBeInTheDocument();
  });

  it("does not accept images larger than 5MB combined", async () => {
    const files = [
      createFile("foo.png", 6 * 1024 * 1000, "image/png"),
      createFile("foo.png", 2 * 1024 * 1000, "image/png"),
      createFile("foo.png", 12 * 1024 * 1000, "image/png"),
    ];
    const uploadField = screen.getByTestId("dropzone").querySelector("input");
    if (!uploadField) {
      expect(uploadField).not.toBeNull();
      return;
    }
    userEvent.upload(uploadField, files);

    expect(
      await screen.findByText(
        "Images not accepted. Select up to 3 images with a maximum size of 5MB",
      ),
    ).toBeInTheDocument();
  });
});
