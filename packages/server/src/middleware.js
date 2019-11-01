export function authorize(opts) {
  return (req, res, next) => {
    req.session.accessToken ? next() : res.redirect(opts.redirectTo);
  };
}
