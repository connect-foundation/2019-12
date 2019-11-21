import '../../src/env';
import { sequelize, migrate, seed } from '../../src/services/sequelize';
import { User, Event } from '../../src/models';
import { readJSONData } from '../../src/utils/readJSON';
import { resolve } from 'path';

const SEED_DIR = resolve(__dirname, '../../db_seed');

beforeAll(async () => {
  sequelize.options.logging = false;
  try {
    await migrate();
    await seed();
  } catch (error) {
    // UniqueConstraintError
    console.info('already seed');
  }
});

afterAll(async () => {
  await sequelize.close();
});

const isSame = <T>(target: T, origin: T): boolean => {
  const keys = Object.keys(origin) as (keyof T)[];
  return keys.every(key => {
    if (!origin[key]) return true;

    if (typeof target[key] === 'object' && typeof origin[key] === 'string')
      expect(target[key]).toMatchObject(new Date(JSON.stringify(origin[key])));
    else expect(target[key]).toBe(origin[key]);
    return true;
  });
};

describe('DB seed 데이터가 유효', () => {
  it('User 데이터가 유효', async () => {
    // given
    const users = await User.findAll();
    const usersPath = resolve(SEED_DIR, 'users.json');
    const origins = await readJSONData<User>(usersPath);

    // when
    users.forEach(user => {
      const origin = origins.find(origin => origin.id === user.id);

      // then
      isSame(user, origin);
    });
  });

  it('Event 데이터가 유효', async done => {
    const events = await Event.findAll();
    const eventPath = resolve(SEED_DIR, 'events.json');
    const origins = await readJSONData<Event>(eventPath);

    events.forEach(event => {
      const origin = origins.find(origin => origin.id === event.id);
      isSame(event, origin);
    });
    done();
  });
});
