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
    Default: ''
  }
};
