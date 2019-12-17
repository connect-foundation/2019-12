import '../../src/env';
import { putObject } from '../../src/utils/awsS3';
import axios from 'axios';
import { v1 as uuid } from 'uuid';

describe('utils - putObject()', () => {
  it('버킷에 업로드 후 URL 로 컨텐츠 접근', async () => {
    const key = uuid();
    const content = uuid();
    const contentBuffer = Buffer.from(content, 'utf-8');
    const { URL } = await putObject(key, contentBuffer);
    const { data } = await axios.get(URL);

    expect(data).toBe(content);
  });
});
