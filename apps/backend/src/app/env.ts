export const MONGODB_PROTOCOL = process.env.MONGODB_PROTOCOL || 'mongodb://';
export const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
export const MONGODB_USER_NAME = process.env.MONGODB_USER_NAME || 'localadmin';
export const MONGODB_USER_PASSWORD =
  process.env.MONGODB_USER_PASSWORD || 'localadmin';
export const MONGODB_DB = 'hack-it';
export const PORT = toNumber(process.env.PORT, 3000);

function toNumber(str: string, fallback: number): number {
  if (!str) {
    return fallback;
  }
  const parsed = +str;
  if (isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}
