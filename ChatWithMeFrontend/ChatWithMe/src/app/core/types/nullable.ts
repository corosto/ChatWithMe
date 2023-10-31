export type Nullable<T> = T | null;

export type IForm<T> = {
  [K in keyof T]?: any;
}