//-------------------------------------------------------------
// errors upload File
module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };
  if (err.message.includes('Invalid file'))
    errors.format = 'Format incompatible';

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500Ko';
  return errors;
};
