enum imageTypeEnum {
  mainEventImg,
  eventDetailImg,
}

export interface ImageType {
  width: number;
  height: number;
  type: 'f';
}

export const imageTypes: Record<keyof typeof imageTypeEnum, ImageType> = {
  mainEventImg: {
    width: 240,
    height: 135,
    type: 'f',
  },
  eventDetailImg: {
    width: 240,
    height: 135,
    type: 'f',
  },
};
