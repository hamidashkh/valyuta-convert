let btnsLeft = document.querySelectorAll('.currency_elements_left');
let btnsRight = document.querySelectorAll('.currency_elements_right');
let inpt = document.querySelector('.input_currency');
let inp_right = document.querySelector('.want');
let baseCurrency = 'RUB', targetCurrency = 'USD';
let amount = 1;
let current_txt = document.querySelectorAll('.current-txt');



inpt.addEventListener('input', () => {

    let letters = /^[A-Za-z]+$/;


    if (inpt.value.match(letters)) {
        inpt.value = ''
    } else {

        if (inpt.value.match(',')) {
            let newValue = inpt.value.replace(',', '.');
            inpt.value = newValue
        }

    }



    getValue(baseCurrency, targetCurrency, inpt.value);

});

inp_right.addEventListener('input', () => {

    let letters = /^[A-Za-z]+$/;


    if (inp_right.value.match(letters)) {
        inp_right.value = ''
    } else {

        if (inp_right.value.match(',')) {
            let newValue = inp_right.value.replace(',', '.');
            inp_right.value = newValue
        }

    }


    getValue1(baseCurrency, targetCurrency, inp_right.value);

});


btnsLeft.forEach(button => {
    button.addEventListener('click', function () {
        baseCurrency = button.innerText
        btnsLeft.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');


       
        getValue1(baseCurrency, targetCurrency, inp_right.value)
    });
});

btnsRight.forEach(button => {
    button.addEventListener('click', function () {
        targetCurrency = button.innerText
        btnsRight.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');

        getValue(baseCurrency, targetCurrency, inpt.value);
    });
});





function getValue(baseCurrency, targetCurrency, amount) {


    if (baseCurrency === targetCurrency) {

        inp_right.value = inpt.value

        current_txt[0].innerText = `1 ${baseCurrency} = 1 ${targetCurrency}`
        current_txt[1].innerText = `1 ${targetCurrency} = 1 ${baseCurrency}`

    } else {

        fetch(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${targetCurrency}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                current_txt[0].innerText = `1 ${baseCurrency} = ${data.result} ${targetCurrency}`
                current_txt[1].innerText = `1 ${targetCurrency} = ${1 / data.result} ${baseCurrency}`

                if (Number(inpt.value) === 0) {
                    inp_right.value = ''
                } else {

                    inp_right.value = amount * data.result;
                }

            })


        .catch(error => {
            inp_right.value = `Oops..Something is wrong!`;
            inp_right.style.color = 'red';
            inp_right.style.fontSize = '20px';
            console.error('There was an error!', error);
        });


    }

}




function getValue1(baseCurrency, targetCurrency, amount) {

    if (baseCurrency === targetCurrency) {

        inpt.value = inp_right.value

        current_txt[0].innerText = `1 ${baseCurrency} = 1 ${targetCurrency}`
        current_txt[1].innerText = `1 ${targetCurrency} = 1 ${baseCurrency}`

    } else {

        fetch(`https://api.exchangerate.host/convert?from=${targetCurrency}&to=${baseCurrency}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

            current_txt[0].innerText = `1 ${baseCurrency} = ${data.result} ${targetCurrency}`
            current_txt[1].innerText = `1 ${targetCurrency} = ${1 / data.result} ${baseCurrency}`

            inpt.value = amount * data.result;
            
        })

        .catch(error => {
            inpt.value = `Oops..Something is wrong!`;
            inpt.style.color = 'red';
            inpt.style.fontSize = '20px';
            console.error('There was an error!', error);
        });
        
    }
        
}


getValue(baseCurrency, targetCurrency, amount);




