export const ApplicationConstants = {
  ApiBaseUrl: 'http://localhost:5000/Devices',
  Endpoints: {
    GetAllDevices: '',
    GetDevice: '/get-device',
    AddDevice: '/add',
    EditDevice: '/edit',
    DeleteDevice: '/delete'
  },
  Routes: {
    DeviceList: 'devices',
    DeviceDetail: 'details/:identifier',
    DeviceCreate: 'create',
    DeviceEdit: 'edit/:identifier',
    Default: ''
  },
  ValidationMessages: {
    RequiredField: 'This field is required strictly.',
    DuplicateDevice: 'A device with this exact name already exists. Provide a unique name.'
  }
};
