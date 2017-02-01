export default action => {
  const c = action.tweenConfig;
  if (!c) return true;
  return c.filter && !c.filter(action);
};
