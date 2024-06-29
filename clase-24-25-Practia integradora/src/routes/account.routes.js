import { Router } from "express";
import accountServices from "../services/account.services.js";
import passport from "passport";

const router = Router();

router.put("/deposit", passport.authenticate("jwt", { session: true }), async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const queryAccount = alias ? { alias } : { number };
    const findAccount = await accountServices.getOnAccount(queryAccount);
    if (!findAccount) return res.status(404).json({ status: "error", message: "Cuenta no encontrada" });

    const account = await accountServices.depositAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

router.put("/extract", passport.authenticate("jwt", { session: true }), async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const queryAccount = alias ? { alias } : { number };
    const findAccount = await accountServices.getOnAccount(queryAccount);
    if (!findAccount) return res.status(404).json({ status: "error", message: "Cuenta no encontrada" });
    if (findAccount.balance < amount) return res.status(400).json({ status: "error", message: "Saldo insuficiente para la extracción" });

    const account = await accountServices.extractAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

router.put("/transfer", passport.authenticate("jwt", { session: true }), async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;

    const user = req.user;

    const queryAccount = alias ? { alias } : { number };

    const originAccount = await accountServices.getOnAccount({ userId: user.id });

    const destinationAccount = await accountServices.getOnAccount(queryAccount);
    if (!destinationAccount || !originAccount) return res.status(404).json({ status: "error", message: "Cuenta no encontrada" });

    if (originAccount.balance < amount) return res.status(400).json({ status: "error", message: "Saldo insuficiente para la operación" });

    const account = await accountServices.transferBalance({ alias: originAccount.alias }, queryAccount, amount, description);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

export default router;
