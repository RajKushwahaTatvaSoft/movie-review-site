export const EnvironmentConfig: EnvironmentInterface = {
  apiUrl: 'https://localhost:7048',
  production: false,
};

export interface EnvironmentInterface {
  production: boolean;
  apiUrl: string;
}
