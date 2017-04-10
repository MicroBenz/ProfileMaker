export default () => next => (action) => {
  if (!action.promise) {
    return next(action);
  }
  next({
    ...action,
    type: action.type.PENDING,
  });
  return action.promise.then(
    data => next({
      ...action,
      type: action.type.RESOLVED,
      data,
    }),
  );
};
