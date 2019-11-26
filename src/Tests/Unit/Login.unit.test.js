import ApiAgent from "../../Web/ApiAgent";

describe('Login test', () => {
   it('Testing login with predefined credentials', async () => {
      const username = "am";
      const password = "G@64z%kw";

      await ApiAgent.UserActions.login(username, password).then(result => {
         expect(result.token).not.toBeNull();
      });
   });
});