import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSecret = process.env.JWT_SECRET as string;

export interface JWTRequest extends Request {
  token?: string | JwtPayload;
}

const authorize = (
  req: JWTRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorisation as string;

  if (!authHeader) {
    res
      .status(401)
      .json({ message: "An authentication token is required for this route" });
    return;
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Token is invalid" });
      return;
    }

    req.body.token = decodedToken;
    next();
  });
};

export default authorize;
