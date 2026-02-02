export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    return Promise.reject(error ?? { message: res.statusText });
  }
  return res.json() as Promise<T>;
};
