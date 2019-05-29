const TABLE_PROFIX = 'ncache'

export const tablename = (name: string) => {
  return `${TABLE_PROFIX}_${name}`;
}