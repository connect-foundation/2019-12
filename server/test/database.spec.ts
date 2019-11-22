import { sequelize } from '../src/services/sequelize';
import {
  Event,
  Order,
  OrderTicket,
  TicketSubscription,
  TicketType,
  User,
} from '../src/models';

describe('DB connection Test', () => {
  afterAll(async done => {
    sequelize.close();
    done();
  });
  const models = sequelize.models;
  test('DB는 모든 모델을 소유한다.', async () => {
    const isAllChecked =
      models.Event === Event &&
      models.Order === Order &&
      models.OrderTicket === OrderTicket &&
      models.TicketSubscription === TicketSubscription &&
      models.TicketType === TicketType &&
      models.User;
  });
});
