import { readJSONData } from '../../src/utils/readJSON';
import { resolve } from 'path';

describe('utils - readJSON', () => {
  it('readJSONData 로 정상적으로 파일을 읽음', async () => {
    const data = await readJSONData(resolve(__dirname, 'file/test.json'));
    expect(data).toMatchSnapshot();
  });

  it('readJSONData 에 비정상적인 path 를 넣으면 에러 발생', async () => {
    await expect(
      readJSONData(resolve(__dirname, 'file/wrongFile.json')),
    ).rejects.toThrowError();
  });
});
