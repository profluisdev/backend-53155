import { movementModel } from "./models/movement.model.js";

const getAll = async (query) => {
  return await movementModel.find(query);
};

const getOne = async (query) => {
  return await movementModel.findOne(query); // { name: "Luis" } {email: "luis@gmail.com"}
};

const create = async (data) => {
  return await movementModel.create(data);
};

const update = async (id, data) => {
  return await movementModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await movementModel.deleteOne({ _id: id });
};

export default { getAll, getOne, create, update, deleteOne };