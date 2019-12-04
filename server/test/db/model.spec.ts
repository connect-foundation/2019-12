import '../../src/env';
import { sequelize } from '../../src/utils/sequelize';
import * as models from '../../src/models';

describe('DB connection Test', () => {
  afterAll(async done => {
    sequelize.close();
    done();
  });

  const modelManager = sequelize.modelManager;
  test('DB는 모든 모델을 소유한다.', async () => {
    const isAllModelsChecked = Object.entries(models).every(
      ([key, value]) => modelManager.getModel(key) === value,
    );
    expect(isAllModelsChecked).toBeTruthy();
  });
});
