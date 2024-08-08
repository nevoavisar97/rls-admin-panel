import emailjs from 'emailjs-com';

emailjs.init('dV_nZY-oEfpk-68DC'); // Initialize EmailJS with your user ID

export const sendEmail = (templateParams) => {
  return emailjs.send('service_y9ncfwj', 'template_7b52iux', templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
};
