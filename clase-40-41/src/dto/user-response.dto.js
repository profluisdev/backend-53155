export const userResponseDto = (user) => {
  return {
    first_name: user.first_name,
    email: user.email,
    role: user.role,
  };
};
