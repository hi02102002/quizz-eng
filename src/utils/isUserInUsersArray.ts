export const isUserInUsersArray = (
   userId: string,
   users: Array<string>
): boolean => {
   return users.some((id) => id === userId);
};
