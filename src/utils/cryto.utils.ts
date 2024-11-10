import * as bcryptjs from 'bcryptjs';

export class CrytoUtils {
  static async validatePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, encryptedPassword);
  }
}
