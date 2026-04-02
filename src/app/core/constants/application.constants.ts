export const ApplicationConstants = {
  ApiBaseUrl: 'http://localhost:5000',
  Endpoints: {
    Devices: {
      GetAllDevices: '/Devices',
      GetDevice: '/Devices/get-device',
      AddDevice: '/Devices/add',
      EditDevice: '/Devices/edit',
      DeleteDevice: '/Devices/delete',
      AssignDevice: '/Devices/assign',
      UnassignDevice: '/Devices/unassign'
    },
    Authentication: {
      Login: '/Auth/login',
      Register: '/Auth/register'
    },
    Ai: {
      Chat: '/Ai/chat'
    }
  },
  Routes: {
    DeviceList: 'devices',
    DeviceDetail: 'details/:identifier',
    DeviceCreate: 'create',
    DeviceEdit: 'edit/:identifier',
    Login: 'login',
    Register: 'register',
    Default: ''
  },
  ValidationMessages: {
    RequiredField: 'This field is required strictly.',
    DuplicateDevice: 'A device with this exact name already exists. Provide a unique name.',
    InvalidEmailFormat: 'The email address provided is not in a valid format.',
    PasswordMinimumLengthError: 'The password must contain at least six characters.'
  },
  StorageKeys: {
    AuthenticationToken: 'AuthenticationToken'
  }
};
