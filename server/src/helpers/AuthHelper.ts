import * as EmailValidator from 'email-validator';
import passwordValidator from "password-validator";
import bcrypt from 'bcrypt';

export const validateEmail = (email: string) => {
    return EmailValidator.validate(email);
};

export const validatePassword = (password: string) => {
    const pswdSchema = new passwordValidator();

    pswdSchema.is().min(8);
    pswdSchema.has().uppercase().lowercase().digits(2);

    return pswdSchema.validate(password);
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, receivedPassword);
};

