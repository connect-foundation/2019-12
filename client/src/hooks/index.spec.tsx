import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import Axios from 'axios';

import { useFetch } from '.';

describe('Hooks', () => {
  it('useFetch (Mock API)', async () => {
    // given
    const mockURL = 'http://www.mocky.io/v2/5dde1af02f00004b697eacd6';
    const result = await Axios({
      method: 'get',
      url: mockURL,
    });
    const { status, data } = result;
    expect(status).toBe(200);
    expect(data.hello).toBe('world');
  });
  it('useFetch가 정상적으로 이루어진다.', async () => {
    // given
    const mockURL = 'http://www.mocky.io/v2/5dde1af02f00004b697eacd6';
    let step = 0;
    const steps = [
      { type: 'request', isLoading: true },
      { type: 'success', isLoading: false, data: { hello: 'world' } },
    ];
    const resultTypes: object[] = [];

    function MockComponent(): React.ReactElement {
      const result = useFetch({
        method: 'get',
        url: mockURL,
      });

      useEffect(() => {
        resultTypes.push(result);
      }, [result]);

      return <></>;
    }
    // when
    const wrapper = mount(<MockComponent />);

    // then
    await new Promise(resolve => {
      (function waitFetching() {
        setTimeout(() => {
          if (resultTypes[step]) {
            step += 1;
            if (steps.length === step) {
              return resolve();
            }
          }
          waitFetching();
        });
      })();
    });

    expect(steps).toEqual(resultTypes);
  });

  it('useFetch는 에러처리가 가능하다', async () => {
    // given
    const mockURL = 'http://www.mocky.io/v2/1234567890';
    let step = 0;
    const steps = ['request', 'failure'];
    const resultTypes: string[] = [];

    function MockComponent(): React.ReactElement {
      const result = useFetch({
        method: 'get',
        url: mockURL,
      });

      useEffect(() => {
        resultTypes.push(result.type);
      }, [result]);

      return <></>;
    }
    // when
    const wrapper = mount(<MockComponent />);

    // then
    await new Promise(resolve => {
      (function waitFetching() {
        setTimeout(() => {
          if (resultTypes[step]) {
            step += 1;
            if (steps.length === step) {
              return resolve();
            }
          }
          waitFetching();
        });
      })();
    });
    expect(steps).toEqual(resultTypes);
  });
});
