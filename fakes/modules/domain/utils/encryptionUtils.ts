export const decrypt = async (session: string) => {
  return JSON.parse(session || "{}");
};

export const encrypt = async (payload: object) => {
  return JSON.stringify(payload);
};

export const hash = async (value: string) => {
  return value;
};
