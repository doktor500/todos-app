export const authCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, samesite: "strict", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};
