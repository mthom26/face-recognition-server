const { createUser } = require('./createUserApi');

describe('Create New User', () => {
  it('creates new user', async () => {
    const expectedResult = {
      status: 201,
      message: 'Signed Up!'
    };

    const result = await createUser('Jimbo', 'jimbo@testmail.com', 'jimbopw');
    expect.assertions(4);
    expect(result.status).toEqual(expectedResult.status);
    expect(result.data.message).toEqual(expectedResult.message);
    expect(result.data.token).not.toBeNull();
    expect(result.data.token).not.toBeUndefined();
  });

  it('returns error when trying to create existing user', async () => {
    const expectedResult = {
      status: 400,
      message: 'That user already exists!'
    };

    const result = await createUser('Datboi', 'datboi@testmail.com', 'datboi');
    expect.assertions(2);
    expect(result.status).toEqual(expectedResult.status);
    expect(result.data.message).toEqual(expectedResult.message);
  });
});
