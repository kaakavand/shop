const yes = document.querySelector('.yes')
const no = document.querySelector('.no')

yes.addEventListener('click' , () => window.location.href = 'http://localhost:3000/payment?result=yes')
no.addEventListener('click' , () => window.location.href = 'http://localhost:3000/payment?result=no')