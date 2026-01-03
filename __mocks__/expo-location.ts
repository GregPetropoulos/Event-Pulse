export const getForegroundPermissionsAsync = jest.fn().mockResolvedValue({
  status: "granted",
});

export const requestForegroundPermissionsAsync = jest.fn();
export const getCurrentPositionAsync = jest.fn();
