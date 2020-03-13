export default (
  type: string
): {
  type: string;
  run: (
    payload?: {},
    meta?: {}
  ) => {
    type: string;
    payload: {};
    meta: {};
  };
} => ({
  type,
  run: (payload, meta) => ({
    type,
    payload,
    meta
  })
});
