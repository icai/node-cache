const TABLE_PROFIX = 'ncache'

export const tablename = (name: string) => {
  return `${TABLE_PROFIX}_${name}`;
}

export const random = (length: number, symbols?: string) => {
  length = length || 5;
  const symbol = symbols || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = Array.from({ length }, () => {
    return symbol.charAt(Math.floor(Math.random() * symbol.length));
  });

  return array.join('');
}
const matchOpRegex = /[|\\{}()[\]^$+*?.-]/g;
export const escapeReg = (str: string) => {
  return str.replace(matchOpRegex, '\\$&');
};