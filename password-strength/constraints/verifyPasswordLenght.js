module.exports = password => {
  if (password.length < 6) {
    return Promise.reject({
      message: 'El password es demasiado corto'
    });
  }
  return Promise.resolve({
    message: 'El password pasa la validacion.'
  });
};
