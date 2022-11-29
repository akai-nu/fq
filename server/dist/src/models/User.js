var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require("../config/db");
class User {
    constructor(user_id, displayName, email, profession, research_location, password) {
        this.user_id = user_id;
        this.displayName = displayName;
        this.email = email;
        this.profession = profession;
        this.research_location = research_location;
        this.password = password;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO users(user_id, displayName, email, profession , research_location, password) VALUES (${this.user_id}, ${this.displayName}, ${this.email}, ${this.profession}, ${this.research_location}, ${this.password})`;
            const [newUser, _] = yield db.execute(query);
            return newUser;
        });
    }
    static findAll() {
    }
}
module.exports = User;
//# sourceMappingURL=User.js.map