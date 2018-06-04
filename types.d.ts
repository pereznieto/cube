declare module '*.scss' {
  const _default: {
    [key: string]: string;
  };
  export default _default;
}

declare module '*.svg' {
  const _default: string;
  export default _default;
}

declare module '*.png' {
  const _default: string;
  export default _default;
}

declare module 'Utils' {
  type Overwrite<T1, T2> = {
    [P in Exclude<keyof T1, keyof T2>]: T1[P]
  } & T2;
}
