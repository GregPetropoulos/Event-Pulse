/* eslint-disable */

// NOT USED IN TEST RIGHT NOW,
// Needed to mock here dues to RNTL/Jest picking up MMKV instance with NitroModules
// you only mock for unit + component tests in Jest.
module.exports = {
  createMMKV: () => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    clearAll: jest.fn(),
  }),
};
