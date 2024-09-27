export const formData = (data: object) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.set(key, value.toString());
  });

  return formData;
};
