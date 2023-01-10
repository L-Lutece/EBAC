
const form = document.querySelector('#form');
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const rua = document.getElementById('rua');
const mensagem = document.querySelector('#mensagem');
const notNull = document.getElementsByClassName('not-null');

function isEmpty(elem){
    return elem.value.length < 1 ? `O campo <strong>${elem.name}</strong> não pode ser vazio.` : ''; 
}

function validaEmail(elem){
    return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : `Digite um <strong>e-mail</strong> válido`;
}

function validaCPF(cpf) {
    //trata os pontos e traços
    exp = /\.|-/g;
    cpf = cpf.toString().replace(exp, "");
  
    //inicio da validação
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
        soma2 = 0;
    var vlr = 11;
    for (i = 0; i < 9; i++) {
      soma1 += eval(cpf.charAt(i) * (vlr - 1));
      soma2 += eval(cpf.charAt(i) * vlr);
      vlr--;
    }
    soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
  
    //Retira da regra os cpf de um número só, que também são válidos mas inexistentes
    if (cpf === "11111111111" || cpf === "22222222222" || cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" || cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" || cpf === "99999999999" || cpf === "00000000000") {
      var digitoGerado = null;
    } else {
      var digitoGerado = (soma1 * 10) + soma2;
    }
    if (digitoGerado !== digitoDigitado) {
      return false;
    }
    return true;
}

function validaCEP(elem){
    if(!elem.value.match(/^[0-9]{8}/)) 
        return `Digite um CEP válido.`;
    else return '';
}

function updateAdress(data) {
    if( !('erro' in data)) {
        rua.value=(data.logradouro);
        bairro.value=(data.bairro);
        cidade.value=(data.localidade);
        uf.value=(data.uf);
        mensagem.innerHTML = '';
    } else {
        mensagem.innerHTML = `CEP não encontrado`;
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    let msg = [];
    let markup = '';
   
    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field);
        if(fieldState) 
            msg.push(fieldState);
    });

    const isEmail = validaEmail(email);
    if(isEmail) msg.push(isEmail);

    const isCEP = validaCEP(cep);
    if(isCEP.length > 0) {
        msg.push(isCEP);
    } else {  
        const script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + cep.value + '/json?callback=updateAdress';
        document.body.appendChild(script);
    }

    msg.forEach(item => {
        markup += `<p>${item}</p>` 
    });

    mensagem.innerHTML = markup;

    // if(msg.length == 0)  form.submit();

});