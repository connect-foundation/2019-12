import { convertAddressToLocation } from '.';

describe('Atom / GoogleMap', () => {
  it('Google API를 호출하여 주소를 location으로 변환한다.', async () => {
    // given
    const address = '강남역';
    const location = {
      lat: 37.49795,
      lng: 127.027637,
    };

    // when
    const response = await convertAddressToLocation(address);

    // then
    const isMatch =
      location.lat === response.lat && location.lng === response.lng;
    expect(isMatch).toBeTruthy();
  });
});
