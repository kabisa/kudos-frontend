import React, {
  Ref,
  useImperativeHandle, useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import s from './ImageUpload.module.scss';

export interface Props {
  onChange: (images: File[]) => void
}

interface ImageUploadRef {
  resetState(): void;
}

interface Preview {
  source: string
  name: string
}

export const ImageUpload = React.forwardRef<ImageUploadRef, Props>((props: Props, ref: Ref<ImageUploadRef>) => {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 5 * 1024 * 1000,
    maxFiles: 3,
    onDropRejected: () => {
      setErrorMessage('Images not accepted. Select up to 3 images with a maximum size of 5MB');
    },
    onDrop: (acceptedFiles: File[]) => {
      setErrorMessage('');
      props.onChange(acceptedFiles);

      setPreviews(acceptedFiles.map((file) => ({
        source: URL.createObjectURL(file),
        name: file.name,
      })));
    },
  });

  useImperativeHandle(ref, () => ({
    resetState(): void {
      setPreviews([]);
    },
  }));

  const thumbs = previews.map((preview) => (
    <div className={s.thumb} key={preview.name}>
      <img
        src={preview.source}
        alt="preview"
        className={s.img}
      />
    </div>
  ));

  return (
    <section className={s.image_upload_wrapper}>
      <div data-testid="dropzone" {...getRootProps({ className: s.dropzone })}>
        <input {...getInputProps()} />
        <p>Optionally select or drop up to 3 images</p>
      </div>
      {errorMessage && (
        <span className={s.error}>{errorMessage}</span>
      )}
      <aside className={s.thumbs_container}>
        {thumbs}
      </aside>
    </section>
  );
});
ImageUpload.displayName = "ImageUpload";