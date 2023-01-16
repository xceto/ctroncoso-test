import * as jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRED } = process.env;

export class JWTService {
  public async create(email: string): Promise<any> {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRED ? JWT_EXPIRED : 300 });
  }

  public async verify(jwtSecret: string): Promise<{ error: boolean; message: string }> {
    try {
      const validated = jwt.verify(jwtSecret, JWT_SECRET);
      return { error: false, message: validated };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }
}
