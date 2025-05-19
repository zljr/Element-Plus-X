module.exports = {
  '*.ts?(x)': ['eslint --fix'],
  '*.vue': ['eslint --fix'],
  '*.{scss,less,css,html}': ['stylelint --fix'],
  '*.{ts?(x),cjs,scss,less,css,html,json,md}': ['prettier --write'],
};
