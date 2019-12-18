import { ImageType } from './imageTypes';
export { imageTypes } from './imageTypes';

const { REACT_APP_IMAGE_SERVER_URL } = process.env;

function getImageQueryStringFromImageType(imageType: ImageType): string {
  return `w=${imageType.width}&h=${imageType.height}&type=${imageType.type}`;
}

export function getImageURL(imageKey: string, imageType: ImageType): string {
  const imageQueryString = getImageQueryStringFromImageType(imageType);
  return `${REACT_APP_IMAGE_SERVER_URL}/${imageKey}?${imageQueryString}`;
}
