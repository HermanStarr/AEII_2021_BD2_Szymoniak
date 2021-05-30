import Resizer from "react-image-file-resizer";

type ResizeProps = {
  file: Blob | File,
  maxWidth: number,
  maxHeight: number,
  compressionFormat?: 'JPEG' | 'PNG' | 'WEBP',
  quality?: number,
  rotation?: number,
  outputType?: 'base64' | 'blob' | 'file',
  minWidth?: number,
  minHeight?: number,
}

type ToBlobProps = {
  dataURI: string,
  type?: 'jpeg' | 'png' | 'webp';
}

type ToSourceProps = {
  image: File | Blob,
  onLoadEnd: (result: string) => void,
}

export const fileResizer = (props: ResizeProps) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      props.file,
      props.maxWidth,
      props.maxHeight,
      props.compressionFormat ?? 'JPEG',
      props.quality ?? 100,
      props.rotation ?? 0,
      (uri) => resolve(uri),
      props.outputType ?? 'base64',
      props.minWidth,
      props.minHeight,
    );
  });

export const dataURItoBlob = (props: ToBlobProps) => {
  const binary = atob(props.dataURI.split(',')[1]);
  const array = [];
  for(let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob(
    [new Uint8Array(array)],
    {type: 'image/' + props.type ?? 'jpeg'}
  );
}

export const blobToSource = (props: ToSourceProps) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    props.onLoadEnd(reader.result as string);
  }
  reader.readAsDataURL(props.image);
}