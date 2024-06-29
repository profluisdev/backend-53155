import accountDao from "../dao/account.dao.js";

const createAccount = async (userData) => {
  const { name, lastName, _id = null } = userData;
  const accountNumber = Math.floor(Math.random() * 1000000000);
  const alias = `${name.toLowerCase()}.${lastName.toLowerCase()}.${accountNumber.toString().slice(-4)}`;
  const accountData = {
    alias,
    number: accountNumber.toString(),
    userId: _id,
  };
  return await accountDao.create(accountData);
};

const updateAccount = async (accountId, accountData) => {
  return await accountDao.update(accountId, accountData);
}

export default { createAccount, updateAccount };
