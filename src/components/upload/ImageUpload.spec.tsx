import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { withMockedProviders } from '../../spec_helper';
import { ImageUpload } from './ImageUpload';

const createFile = (name: string, size: number, type: string): File => {
  const file = new File([], name, { type });
  Reflect.defineProperty(file, 'size', {
    get() {
      return size;
    },
  });
  return file;
};

const fileChangeEvent = (files: File[]) => ({
  target: { files },
  preventDefault: () => {},
  persist: () => {},
});

describe('<ImageUpload />', () => {
  let wrapper: ReactWrapper;
  let selectedFiles: any = [];

  beforeEach(() => {
    window.URL.createObjectURL = jest.fn();
    wrapper = mount(withMockedProviders(<ImageUpload onChange={(files) => {
      selectedFiles = files;
    }}
    />));
  });

  it('can select files', async () => {
    await act(async () => {
      const files = [
        createFile('foo.png', 200, 'image/png'),
        createFile('bar.jpg', 200, 'image/jpeg'),
      ];

      await wrapper.find('input').simulate('change', fileChangeEvent(files));
      await wrapper.update();

      expect(selectedFiles).toHaveLength(2);
      expect(selectedFiles).toEqual(files);
      expect(wrapper.find('img')).toHaveLength(2);
    });
  });

  it('does not accept more than 3 images', async () => {
    await act(async () => {
      const files = [
        createFile('foo.png', 200, 'image/png'),
        createFile('bar.jpg', 200, 'image/jpeg'),
        createFile('john.jpg', 200, 'image/jpeg'),
        createFile('doe.jpg', 500, 'image/jpeg'),
      ];

      await wrapper.find('input').simulate('change', fileChangeEvent(files));
      await wrapper.update();

      expect(selectedFiles).toHaveLength(0);
      expect(wrapper.find('img')).toHaveLength(0);
      expect(wrapper.find('span').text())
        .toContain('One or more images were not accepted. Up to 3 images are allowed.');
    });
  });
});
