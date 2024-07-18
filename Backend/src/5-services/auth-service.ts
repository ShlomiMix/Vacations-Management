import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";

class AuthService {
  public async register(user: UserModel): Promise<string> {
    user.registerValidate();

    const isTaken = await this.isEmailTaken(user.email);
    
    // Check if the email is taken
    if (isTaken) {
        // throw error if email is taken
      throw new ValidationError("Email is taken choose other email");
    }
    
    // A regularly registered user gets a user role
    user.roleId = RoleModel.User;

    // hash password
    user.password = cyber.hashPassword(user.password);

    const sql = `insert into users(firstName,lastName,email,password,roleId)
    values(?,?,?,?,?)`;

    const info: OkPacketParams = await dal.execute(sql, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ]);
    
    // update to user id
    user.id = info.insertId;
    
    // Receives a token with a secret key and an expiration date of the token 
    const token = cyber.getNewToken(user);

    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    // Check in the schema if receive error validation
    credentials.loginValidate();

    // hash password for comparing the hashes
    credentials.password = cyber.hashPassword(credentials.password);

    // Checks the entire collection of users to make sure there is a user with the entered details
    const sql = "select * from users where email = ? and password = ?";
   
    // Executes the query
    const users = await dal.execute(sql, [
      credentials.email,
      credentials.password,
    ]);
    
    // Extracts the user from users 
    const user = users[0];
    
    // If no such user exists, an error is thrown
    if (!user) {
      throw new UnauthorizedError("Incorrect Email or Password");
    }

    // The user receives a token and an expiration date
    const token = cyber.getNewToken(user);
    
    return token;
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    // Check all emails
    const sql = `select exists(select * from users where email = ?) as isTaken`;
    
    // Execute the SQL query with the provided email parameter 
    const result = await dal.execute(sql, [email]);

    // Extract the value of 'isTaken' from the result of the SQL query
    const isTaken = result[0].isTaken;

    // Return true if 'isTaken' is equal to 1, indicating that the email is already taken; otherwise, return false
    return isTaken === 1;
  }
}

export const authService = new AuthService();
