
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const auth = {
  login: `${apiUrl}/auth/login`,
  change_password: `${apiUrl}/auth/change_password`,
  register: `${apiUrl}/auth/register`,
  logout: `${apiUrl}/auth/logout`,
  refresh: `${apiUrl}/auth/refresh`,
  sendOTP: `${apiUrl}/auth/sendOtp`,
  verifyOTP: `${apiUrl}/auth/verifOtp`,
};

export const profil = {
  list: `${apiUrl}/profil/list`,
};

export const cat = {
  list: `${apiUrl}/categorie/index`,
};

export const project = {
  detail: (slug: any) => `${apiUrl}/user/projet/detail/${slug}`,
  get_curent_request: (slug: any) => `${apiUrl}/projet/request-detail/${slug}`,
  send_request: `${apiUrl}/projet/send-request`,
  getAllCategory: `${apiUrl}/projet/get-all-category`,
  getProjetByCategory: `${apiUrl}/projet/get-projet-by-category`,
  getCategoryWithProjet: `${apiUrl}/projet/get-category-with-projet`,
  getProjetdemande: `${apiUrl}/projet/demande`,
  getProjetMeList: `${apiUrl}/projet/me/list`,
  getProjetsouscription: `${apiUrl}/projet/souscription`,
  getProjetContrePartie: `${apiUrl}/projet/get-projet-contre-partie`,
  pay: `${apiUrl}/pay`,
  search: `${apiUrl}/projet/search`,
  followOwner: `${apiUrl}/projet/follow-owner`,
  followers: `${apiUrl}/projet/followers`,
  following: `${apiUrl}/projet/following`,
};

export const commentaire = {
  commentaire_send: `${apiUrl}/commentaire/send`,

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