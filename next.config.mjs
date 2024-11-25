/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      RECOVER_EMAIL_API: process.env.RECOVER_EMAIL_API, // Explicitly expose the environment variable
    },
  };
  
  export default nextConfig;