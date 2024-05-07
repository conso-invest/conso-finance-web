const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const auth = {
  login: `${apiUrl}/auth/login`,
  register: `${apiUrl}/auth/register`,
  logout: `${apiUrl}/auth/logout`,
  refresh: `${apiUrl}/auth/refresh`,
};

export const profil = {
  list: `${apiUrl}/profil/list`,
};

export const project = {
  detail: (id: any) => `${apiUrl}/projet/detail/${id}`,
  getAllCategory: `${apiUrl}/projet/get-all-category`,
  getProjetByCategory: `${apiUrl}/projet/get-projet-by-category`,
};

/* export const users = {
  list: `${apiUrl}/users`,
  create: `${apiUrl}/users`,
  get: (id) => `${apiUrl}/users/${id}`,
  update: (id) => `${apiUrl}/users/${id}`,
  delete: (id) => `${apiUrl}/users/${id}`,
};

export const products = {
  list: `${apiUrl}/products`,
  create: `${apiUrl}/products`,
  get: (id) => `${apiUrl}/products/${id}`,
  update: (id) => `${apiUrl}/products/${id}`,
  delete: (id) => `${apiUrl}/products/${id}`,
};

export const orders = {
  list: `${apiUrl}/orders`,
  create: `${apiUrl}/orders`,
  get: (id) => `${apiUrl}/orders/${id}`,
  update: (id) => `${apiUrl}/orders/${id}`,
  delete: (id) => `${apiUrl}/orders/${id}`,
}; */