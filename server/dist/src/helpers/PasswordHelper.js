"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.validatePassword = void 0;
const password_validator_1 = __importDefault(require("password-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validatePassword = (password) => {
    const pswdSchema = new password_validator_1.default();
    //NOTE: password must be at least 8 characters long, contain at least 2 digits and at least 1 uppercase and lowercase letter
    pswdSchema.is().min(8);
    pswdSchema.has().uppercase().lowercase().digits(2);
    return pswdSchema.validate(password);
};
exports.validatePassword = validatePassword;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const comparePassword = (password, receivedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, receivedPassword);
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=PasswordHelper.js.map