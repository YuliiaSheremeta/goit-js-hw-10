import iziToast from "izitoast";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(document.querySelector('.input-form').value);
    const status = document.querySelector('input[name="state"]:checked').value;

    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
                    if (status === 'fulfilled') {
                        resolve(delay);
                    } else {
                        reject(delay);
                    }
                }, delay);
    }); 
     promise.then(delay => {
          iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                timeout: 3000 
            });
                }).catch(delay => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
                timeout: 3000
            });
                });
   
});