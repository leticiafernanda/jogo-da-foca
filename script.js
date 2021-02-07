var nomeAnimal = ["Macaco", "Ovelha", "Canguru", "Gato", "Cachorro", "Aranha", "Coelho", "Sapo", "Formiga", "Peixe", "Tubarão", "Cavalo", "Ovelha", "Jacaré", "Leão", "Mosca", "Papaguaio", "Cobra", "Morcego", "Tatu", "Baleia", "Cegonha", "Escorpião", "Caracol", "Frango", "Galinha", "Galo", "Lagarta", "Urso", "Girafa", "Mamute", "Preguiça", "Lobo", "Coiote", "Arraia", "Golfinho", "Capivara", "Camarão", "Tartaruga"];
var UtensiCozinha = ["Faca", "Garfo", "Colher", "Mesa", "Geladeira", "Fogão", "Microondas", "Pia", "Prato", "Armário", "Louça"];
var ObjCasa = ["Cadeira", "Cama", "Comôda", "Porta", "Ventilador", "Televisão", "Rádio", "Estante", "Beliche", "Sofá", "Janela", "Telhado", "Parede", "Calendário"];
var objLimpeza = ["Vassoura", "Espanador", "Aspirador", "Pano", "Rôdo", "Sabão", "Lavadora", "Amaciante", "Água"];
var nomeComidaBebida = ["Coxinha", "Arroz", "Feijão", "Carne", "Pastel", "Suco", "Vinho", "Água", "Milho", "Batata", "Leite", "Pizza", "Hambúrguer", "Sanduíche", "Salada", "Ovo", "Ervilha", "Mandioca", "Banana", "Laranja", "Maçã", "Abacaxi", "Mamão"];
var nomePessoa = ["Leticia", "Sofia", "Ricardo", "Araújo", "José", "André", "Silvia", "Mariana", "Soraia", "Adélia", "Rogério", "Alexandre", "Jonas", "Henrique", "Márcio", "Mário", "Henriqueta", "Marieta", "Armando", "Orlando", "João", "Caio", "Emerson", "Douglas", "Cícero", "Gabriel", "Pedro", "Nathália", "Joana", "Monique", "Eduarda", "Eduardo", "Michael", "Ana", "Severina", "Jorge", "Harry", "Roberto", "Manoela"];
var campoPalavra = [nomeAnimal, UtensiCozinha, ObjCasa, objLimpeza, nomeComidaBebida, nomePessoa];
var abc = "ABCDEFGHIJKLMNOPQRSTUVXZ";
var especial = "AEIOUC"; 
var letrasEspeciais = [{letra: 'A', comAcento: ['Á', 'Ã', 'Â']}, {letra: 'E', comAcento: ['É', 'Ê']}, {letra: 'I', comAcento: ['Í']}, {letra: 'O', comAcento: ['Ó', 'Ô', 'Õ']}, {letra: 'U', comAcento: ['Ú']}, {letra: 'C', comAcento: ['Ç']}]
var quantTentativaErrada = 0;
var quantLetrasEncon = 0;
var palavra = '';

function novaPalavra() {
   var output = "";
   var vetor = campoPalavra[Math.floor(Math.random()*campoPalavra.length)];
   palavra = vetor[Math.floor(Math.random()*vetor.length)];

   for(i = 0;i < palavra.length; i++){
      output += "<div class=letra id=posicao_"+i+"></div>";
   }
   document.getElementById("quadro").innerHTML = output;

   var dica = "<b><font color='purple'>Dica:</font>";

   switch (campoPalavra.indexOf(vetor)) {
      case 0: dica += "<font color='white'> É um animal.</font></b>";
      break;
      case 1: dica += "<font color='white'> É um utensílio de cozinha.</font></b>";
      break;
      case 2: dica += "<font color='white'> É um objeto de casa.</font></b>";
      break;
      case 3: dica += "<font color='white'> É u objeto utilizado para limpeza de casa ou roupa.</font></b>";
      break;
      case 4: dica += "<font color='white'> É uma comida ou uma bebida.</font></b>";
      break;
      case 5: dica += "<font color='white'> É um nome de uma pessoa.</font></b>";
   }

   document.getElementById('dica').innerHTML = dica;
}

function defineABC() {
    var output = '';
    for (i = 0;i < abc.length; i++) { 
    	if (i==11) 
    	   output += '<div class=abc onclick="escolheLetra(this, \''+abc[i]+'\');">'+abc[i]+"</div><br>";
        else
           output += '<div class=abc onclick="escolheLetra(this, \''+abc[i]+'\');">'+abc[i]+"</div>";
    }   

    document.getElementById("abc").innerHTML = output;
}

defineABC();

function eEspecial(letra) {
   for (i = 0;i < especial.length; i++) {
       if (letra == especial[i])
           return true;
   }
      return false;
}

function verificaLetra(letra) {
	var letras = [];
  if (eEspecial(letra)) {
    var letraEsp;
      for (i = 0; i < letrasEspeciais.length; i++) {
         if (letra == letrasEspeciais[i].letra){
             letraEsp = letrasEspeciais[i];
             break;
        }
      }

      for (i = 0; i < palavra.length; i++) {
         if (palavra[i].toUpperCase() == letra) {
            letras.push(i);
         }
      }
      
      for (i = 0; i < palavra.length; i++)
        for (j = 0; j < letraEsp.comAcento.length; j++)
             if (palavra[i].toUpperCase() == letraEsp.comAcento[j])
                letras.push(i);        

  } else {
      for (i = 0;i < palavra.length; i++) {
    	   if (letra == palavra[i].toUpperCase()) {
    		    letras.push(i);
    	}
    }
   }
   return letras;
}


function escolheLetra(botaoSelecionado, letra) {
	lets = verificaLetra(letra); // retorna as posições nas quais se encontram a letra
    if (lets.length) {
       for (i = 0;i < lets.length; i++) {
          posicao = document.getElementById("posicao_"+lets[i]);
          if (posicao.innerHTML == '') {
       	  document.getElementById("posicao_"+lets[i]).innerHTML = "<p>"+palavra[lets[i]].toUpperCase()+"</p>";
          quantLetrasEncon++;
        }
       }
       if (quantLetrasEncon == palavra.length) {
          setTimeout(function() {
            alert("Parabéns!\n Você acertou a palavra!");
            document.getElementById('quadro').innerHTML = '';
            quantTentativaErrada = 0;
            quantLetrasEncon = 0;
            novaPalavra();
          }, 500);   
         }
    } else {
         quantTentativaErrada++;
         elem = document.getElementById('boneco_forca');
         switch (quantTentativaErrada) {
            case 1: elem.style.backgroundPosition = "800px";
            break;
            case 2: elem.style.backgroundPosition = "640px";
            break;
            case 3: elem.style.backgroundPosition = "480px";
            break;
            case 4: elem.style.backgroundPosition = "320px";
            break;
            case 5: elem.style.backgroundPosition = "160px";
            break;
         }
    }
    
    if (quantTentativaErrada == 5) {
      setTimeout(function() {
      alert('Que chato. Você não conseguiu completar a palavra!\nAperte Ok para jogar com outra palavra');
      document.getElementById('quadro').innerHTML = '';
      quantTentativaErrada = 0;
      quantLetrasEncon = 0;
      novaPalavra();
    }, 500);}
}