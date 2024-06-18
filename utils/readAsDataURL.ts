export const readAsDataURL = (blob: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (ev) => {
      if (ev.target == null) return;

      resolve(ev.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
};
