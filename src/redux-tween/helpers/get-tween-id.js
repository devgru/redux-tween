export default ({getId, id}, action) =>
  (getId && getId(action)) || id