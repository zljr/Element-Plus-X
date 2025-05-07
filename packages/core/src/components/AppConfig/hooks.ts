import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from "./constants"

export const useAppConfig = () => {
  return inject(APP_CONFIG_PROVIDE_KEY, defaultAppConfig);
}
