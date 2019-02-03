const { createUser } = require('./createUserApi');

describe('Create New User', () => {
  it('creates new user', async () => {
    const expectedResult = {
      message: 'Signed Up!'
    };

    const result = await createUser();

    expect(result.data).toEqual(expectedResult);
  });
});
