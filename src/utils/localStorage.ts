export const StorageControl = {
  storageSetter: (token: string) => {
    localStorage.setItem("token", token);
  },
  storageRemover: () => {
    localStorage.removeItem("token");
  },
  storageGetter: (itemName: string) => {
    return localStorage.getItem(itemName);
  },
};
