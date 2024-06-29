import { accountModel } from "./models/account.model.js";

const getAll = async (query) => {
  return await accountModel.find(query);
};

const getOne = async (query) => {
  return await accountModel.findOne(query); // { name: "Luis" } {email: "luis@gmail.com"}
};

const create = async (data) => {
  return await accountModel.create(data);
};

const update = async (id, data) => {
  return await accountModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await accountModel.deleteOne({ _id: id });
};

export default { getAll, getOne, create, update, deleteOne };
