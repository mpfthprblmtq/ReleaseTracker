import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (key: string): any => cookies.get<any>(key);
export const setCookie = (key: string, value: any, httpOnly?: boolean) => cookies.set(key, value, {httpOnly: !!httpOnly});
export const clearCookie = (key: string) => cookies.remove(key);
