export const getForegroundPermissionsAsync = jest.fn().mockResolvedValue({
  status: 'granted',
});

export const requestForegroundPermissionsAsync = jest.fn();

export const getCurrentPositionAsync = jest.fn().mockResolvedValue({
  coords: { latitude: 0, longitude: 0 },
});

// export const getCurrentPositionAsync = jest.fn();
