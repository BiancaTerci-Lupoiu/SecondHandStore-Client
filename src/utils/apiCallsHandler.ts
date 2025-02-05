export const getLogger: (tag: string) => (...args: any) => void =
  (tag) =>
  (...args) =>
    console.log(tag, ...args);

const log = getLogger("api");

export interface ResponseProps<T> {
  data: T;
}

export function withLogs<T>(
  promise: Promise<ResponseProps<T>>,
  fnName: string
): Promise<T> {
  log(`${fnName} - started`);
  return promise
    .then((res) => {
      log(`${fnName} - succeeded`);
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      log(`${fnName} - failed`);
      return Promise.reject(err);
    });
}

export const authConfig = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const uploadPictureConfig = (token?: string) => ({
  headers: {
    "Content-Type": `multipart/form-data;`,
    Authorization: `Bearer ${token}`,
  },
});

export const domain = "http://localhost:8081";
