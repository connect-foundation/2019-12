const { DB_HOST, DB_USER, DB_PW, DB_NAME } = process.env;

describe('DB connection Test', () => {
  
  test('DB connection', async () => {=
    expect(res.text).toBe('GET /users');
  });
});
