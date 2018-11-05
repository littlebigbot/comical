export const TITLE_PREFIX = 'Wayward Robot';
export const API_ROOT = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:1337/api/v2';
export const COMICS_ROOT = process.env.NODE_ENV === 'production' ? '/comics/' : 'http://waywardrobot.com/comics/';
