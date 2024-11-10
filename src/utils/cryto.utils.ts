import * as bcryptjs from 'bcryptjs';

export class CrytoUtils {
  static async validatePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, encryptedPassword);
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcryptjs.hash(password, salt);
  }
}
