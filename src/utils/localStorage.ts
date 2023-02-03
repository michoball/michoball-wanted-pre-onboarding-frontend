export const StorageControl = {
  storageSetter: (email: string, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  },
  storageRemover: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  },
  storageGetter: (itemName: string) => {
    return localStorage.getItem(itemName);
  },
};
