export interface SmartHomePayload {
  camera1: {
    temperature: number;
    humidity: number;
  };
  camera2: {
    temperature: number;
    humidity: number;
  };
  lockState: string;
  datetime: string;
}
