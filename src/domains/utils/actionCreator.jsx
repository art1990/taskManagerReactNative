export default type => ({
  type,
  run: (payload, meta) => ({
    type,
    payload,
    meta
  })
});
