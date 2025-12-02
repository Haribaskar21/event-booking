import jwt from "jsonwebtoken";

export const auth = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
