import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // Extract the token string after 'Bearer '
    const token = authHeader.split(" ")[1];

    // Verify the token using your secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secret_key_macha",
    );

    // Attach user ID to the request object so the next route knows who is acting
    req.user = decoded.userId;

    // Proceed to the actual route handler
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default verifyToken;
