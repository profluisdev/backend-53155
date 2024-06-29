import accountDao from "../dao/account.dao.js";
import movementDao from "../dao/movement.dao.js";

const getOnAccount = async (query) => {
  return await accountDao.getOne(query);
};

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
};

const depositAccount = async (query, amount) => {
  const account = await accountDao.getOne(query);
  await movementDao.create({ amount, type: "deposit", originAccountId: account._id, userId: account.userId });
  return accountDao.update(account._id, { balance: account.balance + amount });
};

const extractAccount = async (query, amount) => {
  const account = await accountDao.getOne(query);
  await movementDao.create({ amount: amount * -1, type: "extract", originAccountId: account._id, userId: account.userId });
  return accountDao.update(account._id, { balance: account.balance - amount });
};

const transferBalance = async (originQuery, destinationQuery, amount, description) => {
  const originAccount = await accountDao.getOne(originQuery);
  const destinationAccount = await accountDao.getOne(destinationQuery);

  await movementDao.create({
    amount: amount * -1,
    type: "transfer",
    userId: originAccount.userId,
    originAccountId: originAccount._id,
    destinationAccountId: destinationAccount._id,
    description
  });
  await movementDao.create({
    amount: amount,
    type: "transfer",
    userId: destinationAccount.userId,
    originAccountId: originAccount._id,
    destinationAccountId: destinationAccount._id,
    description
  });
  const originAccountUpdate = await accountDao.update(originAccount._id, { balance: originAccount.balance - amount });
  const destinationAccountUpdate = await accountDao.update(destinationAccount._id, { balance: destinationAccount.balance + amount });
  return { originAccountUpdate, destinationAccountUpdate };
};

export default { createAccount, updateAccount, depositAccount, getOnAccount, extractAccount, transferBalance };
