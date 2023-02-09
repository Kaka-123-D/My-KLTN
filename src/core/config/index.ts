const configs = {
  APP_ENV: import.meta.env.VITE_APP_ENV,
  API_DOMAIN: import.meta.env.VITE_API_DOMAIN,
  S3_DOMAIN: `${import.meta.env.VITE_S3_DOMAIN}`,
};

export default configs;
