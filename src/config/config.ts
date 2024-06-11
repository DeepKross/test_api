import dotenv from 'dotenv';
import Joi, { ValidationResult } from 'joi';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  PORT: Joi.number().default(8080),
  TINIFY_API_KEY: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
}).unknown();

type EnvVars = {
  NODE_ENV: 'production' | 'development' | 'test';
  PORT: number;
  TINIFY_API_KEY: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { value: envVars, error }: ValidationResult = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Type assertion to ensure envVars has the expected shape
const validatedEnvVars = envVars as EnvVars;

interface Config {
  env: 'production' | 'development' | 'test';
  port: number;
  tinify_api_key: string;
  cloudinary_cloud_name: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
}

const config: Config = {
  env: validatedEnvVars.NODE_ENV,
  port: validatedEnvVars.PORT,
  tinify_api_key: validatedEnvVars.TINIFY_API_KEY,
  cloudinary_cloud_name: validatedEnvVars.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: validatedEnvVars.CLOUDINARY_API_KEY,
  cloudinary_api_secret: validatedEnvVars.CLOUDINARY_API_SECRET,
};

export default config;
