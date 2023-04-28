export const getMain = () => '/';
export const getAbout = () => '/about';
export const getProfile = (id: string) => `/profile/${id}`;
export const getArticles = () => '/articles';
export const getArticleDetails = (id: string) => `/articles/${id}`;
export const getArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getArticleCreate = () => '/articles/new';
export const getAdmin = () => '/admin';
export const getForbidden = () => '/forbidden';
export const getNotFound = () => '*';