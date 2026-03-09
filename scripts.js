//Variáveis de estado do jogo.
let flippedCards = [] //Array que armazena as cartas viradas no momento (sempre terá no máximo duas).
let matchedPairs = 0 //Contador de pares encontrados.
let attempts = 0 //Contador de tentativas.
let isCheckingPair = false //Trava o jogo enquanto verifica o par ou esconde as cartas.


// Array com todas as cartas do jogo
const cardItems = [
  {id:1, content:"🚀", matched: false},
  {id:2, content:"🚀", matched: false},
  {id:3, content:"🤓", matched: false},
  {id:4, content:"🤓", matched: false},
  {id:5, content:"🪭", matched: false},
  {id:6, content:"🪭", matched: false},
  {id:7, content:"🤸🏻‍♀️", matched: false},
  {id:8, content:"🤸🏻‍♀️", matched: false},
  {id:9, content:"🧘🏻‍♀️", matched: false},
  {id:10, content:"🧘🏻‍♀️", matched: false},
  {id:11, content:"🛀🏻", matched: false},
  {id:12, content:"🛀🏻", matched: false},
  {id:13, content:"🧚🏼‍♀️", matched: false},
  {id:14, content:"🧚🏼‍♀️", matched: false},
  {id:15, content:"🐲", matched: false},
  {id:16, content:"🐲", matched: false},
]
// Função que embaralhas as cartas. 
function shuffleCards(array) {

  const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1))  //positivo vai depois, negativo vai antes, zero mantém a ordem. 

  return shuffled

  }

  function createCard (card) {
    //Cria o elemento da carta. 
    const cardElement = document.createElement("div")
    cardElement.className = "card"

    //Adiciona a classe "revealed" para mostrar o emoji.
   
    //Cria o elemento do emoji.
    const emoji = document.createElement("span")
    emoji.className = "carta-emoji"
    emoji.textContent = card.content
    emoji.style.visibility = "hidden" //Esconde o emoji inicialmente.
      
    cardElement.appendChild(emoji)

    //adiciona o evento de clique para a carta.
    cardElement.addEventListener("click", () => handleCardClick(cardElement, card)) 
   
    return cardElement

  }
    
  function renderCards () {
    const deck = document.getElementById ("deck")
    deck.innerHTML = "" 
    //Limpa o deck antes de renderizar as cartas embaralhadas. 
    const cards = shuffleCards(cardItems)

    cards.forEach ((item)=>  {
      const cardElement = createCard(item)
      deck.appendChild(cardElement)

    })

    }
    function handleCardClick(cardElement, card) {
      // Ignora cliques enquanto verifica o par ou se a carta já está revelada.
      if (
        isCheckingPair || 
        cardElement.classList.contains("revealed")
      ) {
        return;
      }
    
      // Revela a carta clicada.
      cardElement.classList.add("revealed");
      cardElement.querySelector(".carta-emoji").style.visibility = "visible";
    
      // Adiciona a carta ao array de cartas viradas.
      flippedCards.push({ cardElement, card });
    
      // Verifica se é a segunda carta virada.
      if (flippedCards.length === 2) {
        // Atualiza o estado para indicar que estamos verificando o par.
        isCheckingPair = true; // Trava o jogo enquanto verifica o par.
        attempts++; // Incrementa o contador de tentativas.
            
        // Seleciona as cartas.
        const [firstCard, secondCard] = flippedCards;
    
        // Verifica se as cartas são iguais.
        if (firstCard.card.content === secondCard.card.content) {
          //Incrementa o contador de pares encontrados e marca as cartas como combinadas.
          matchedPairs++;
          //marcar as cartas como encontradas
          cardItems.forEach((item) => {
            if (item.content === firstCard.card.content) {
              item.matched = true;
                      }
          })
          //Limpa array de cartas viradas para a próxima tentativa.
          flippedCards = []

          // Libera a próxima rodada 
          isCheckingPair = false; // Destrava o jogo para novas tentativas.

          // Atualiza o placar
          updateStats ()


          //Verifica se tem itens para encontrar. 
          const toFind = cardItems.find((item) => item.matched === false)
          if (!toFind) {
            alert(`Parabéns! Você encontrou todos os pares em ${attempts} tentativas!`);
          }
              
          } else {
          // Adiciona um pequeno atraso para esconder as cartas.
          setTimeout(() => {
            firstCard.cardElement.classList.remove("revealed");
            secondCard.cardElement.classList.remove("revealed");
            firstCard.cardElement.querySelector(".carta-emoji").style.visibility = "hidden";
            secondCard.cardElement.querySelector(".carta-emoji").style.visibility = "hidden";
            flippedCards = []
            isCheckingPair = false; // Destrava o jogo para novas tentativas.
            updateStats ()
            
          }, 1000); // 1 segundo de atraso.
        }
        
    
      }
    }
    function updateStats () {
      document.getElementById("stats").textContent = `${matchedPairs} acertos de ${attempts} tentativas`
    }
    function resetGame () {
      flippedCards = []
      matchedPairs = 0
      attempts = 0
      isCheckingPair = false

      cardItems.forEach((item) => (item.matched = false)) //Reseta o estado de cada carta para não combinada.{
      // Redenriza novamente e atualiza as cartas
      renderCards()
      updateStats()
    }
    function initGame () {

    renderCards()

    // Adiciona o evento de clique para o botão de reiniciar.
    document.getElementById("restart").addEventListener("click", resetGame)
    }
    initGame()
    