import customErrors from "../errors/customErrors.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/sendMails.js";

const sendEmailResetPassword = async (email) => {
    const message = "Debe restablecer su password en el siguiente link https://www.google.com";
    await sendMail(email, "Restablecer password", message);

    return "Email enviado";
};

const resetPassword = async (email, password) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw customErrors.notFoundError("User not found");

    const passwordIsEqual = isValidPassword(user, password);
    console.log(passwordIsEqual);
    if (passwordIsEqual) throw customErrors.badRequestError("Password already exists");

    return await userRepository.update(user._id, { password: createHash(password) });
};

const changeUserRole = async (uid) => {
    const user = await userRepository.getById(uid);
    if (!user) throw customErrors.notFoundError("User not found");

    if (user.role === "user" && user.documents.length < 3) throw customErrors.badRequestError("You most all required documentation");

    const userRole = user.role === "premium" ? "user" : "premium";
    return await userRepository.update(uid, { role: userRole });
};

const addDocuments = async (uid, reqFiles) => {
    const files = reqFiles.document;
    const userDocuments = files.map((file) => {
        return {
            name: file.filename,
            reference: file.path,
        };
    });

    const user = await userRepository.update(uid, { documents: userDocuments });

    return user;
};

export default { sendEmailResetPassword, resetPassword, changeUserRole, addDocuments };
