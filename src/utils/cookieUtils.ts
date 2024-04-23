export const getCookie = (key: string): string | undefined => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(key + '=') === 0) {
      console.debug('Cookie ' + key + ' successfully retrieved!')
      return decodeURIComponent(cookie.substring(key.length + 1, cookie.length));
    }
  }
  return undefined;
}

export const setCookie = (key: string, value: any, options?: any) => {
  options = options || {};

  // set the expires attribute
  let expires = options.expires;
  if (typeof expires == "number" && expires) {
    let d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = key + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  console.debug('Saving ' + key + ' cookie with value: ' + value);
  document.cookie = updatedCookie;
};
