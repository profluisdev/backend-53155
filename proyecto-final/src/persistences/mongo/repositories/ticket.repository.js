import { ticketModel } from "../models/ticket.model.js";

const create = async (data) => {
  return await ticketModel.create(data);
};

export default {
  create,
};
