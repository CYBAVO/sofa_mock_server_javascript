module.exports.randomString = function (length) {
  let r = '';
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i++)
    r += charset.charAt(Math.floor(Math.random() * charset.length));
   
  return r;
}