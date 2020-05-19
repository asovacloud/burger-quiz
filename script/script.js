// global listener
document.addEventListener('DOMContentLoaded', () => {

  // variables
  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const btnCloseModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const burgerBtn = document.getElementById('burger');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const btnSend = document.getElementById('send');
  const modalDialog = document.querySelector('.modal-dialog');
  const modalTitle = document.querySelector('.modal-title');

  let clientWidth = document.documentElement.clientWidth;
  burgerBtn.style.display = 'none';

  // show/hide burger
  if(clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  // data
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
          {
              title: 'Стандарт',
              url: './image/burger.png'
          },
          {
              title: 'Черный',
              url: './image/burgerBlack.png'
          }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
          {
              title: 'Курица',
              url: './image/chickenMeat.png'
          },
          {
              title: 'Говядина',
              url: './image/beefMeat.png'
          },
          {
              title: 'Свинина',
              url: './image/porkMeat.png'
          }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
          {
              title: 'Помидор',
              url: './image/tomato.png'
          },
          {
              title: 'Огурец',
              url: './image/cucumber.png'
          },
          {
              title: 'Салат',
              url: './image/salad.png'
          },
          {
              title: 'Лук',
              url: './image/onion.png'
          }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [
          {
              title: 'Чесночный',
              url: './image/sauce1.png'
          },
          {
              title: 'Томатный',
              url: './image/sauce2.png'
          },
          {
              title: 'Горчичный',
              url: './image/sauce3.png'
          }
      ],
      type: 'radio'
    }
  ];

  // functions
  let count = -100;
  let interval;
  modalDialog.style.top = count + '%';

  // start test
  const playTest = () => {

    // variable with the number of the question
    let numberQuestion = 0;
    modalTitle.textContent = 'Ответить на вопрос';

    const finalAnswers = [];
    const obj = {};

    // render answers
    const renderAnswers = index => {
      formAnswers.textContent = '';
      questions[index].answers.forEach((answer) => {
        const div = document.createElement('div');
        div.classList.add('answers-item', 'd-flex', 'justify-content-center');
        const cardAnswer = `
          <input
            type="${ questions[index].type }"
            id="${ answer.title }"
            name="${ questions[index].question }"
            class="d-none"
            value="${ answer.title }"
          />
          <label for="${ answer.title }" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src=${ answer.url } alt="burger">
            <span>${ answer.title }</span>
          </label>
        `;
        div.innerHTML = cardAnswer;
        formAnswers.insertAdjacentElement('beforeend', div);
      });
    }

    // render questions
    const renderQuestions = index => {

      switch (true) {
        case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = questions[index].question;
          renderAnswers(index);

          btnPrev.classList.remove('d-none');
          btnNext.classList.remove('d-none');
          btnSend.classList.add('d-none');
          break;
        case (numberQuestion === questions.length):
          btnNext.classList.add('d-none');
          btnPrev.classList.add('d-none');
          btnSend.classList.remove('d-none');

          // render content for the item
          modalTitle.textContent = '';
          questionTitle.textContent = '';
          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="numberPhone">Enter phone, please:</label>
              <input type="tel" class="form-control" id="numberPhone" placeholder="Enter phone"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">
            </div>
          `;
          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', event => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
          })
          break;
        case (numberQuestion === questions.length + 1):
          btnSend.classList.add('d-none');
          formAnswers.textContent = `
            Your order was received.
            Our manager will call you.
            Thank you.
          `;

          for (let key in obj) {
            let newObj = {};
            newObj[key] = obj[key];
            finalAnswers.push(newObj);
          }

          setTimeout(() => {
            closeModal();
          }, 5000);
          break;
      }

      switch (true) {
        case (numberQuestion === 0):
          btnPrev.classList.add('d-none');
      }

      switch (true) {
        case (numberQuestion === 0):
          btnPrev.classList.add('d-none');
      }
      
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {

      const inputs = [ ...formAnswers.elements ].filter(input => {
        return input.checked || input.id === 'numberPhone'
      });

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }

        if (numberQuestion === questions.length) {
          obj['Phone number'] = input.value;
        }

      });

    };

    // listeners for the prev/next buttons
    btnPrev.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    btnNext.onclick = () => {
      checkAnswer();
      numberQuestion++
      renderQuestions(numberQuestion);
    };

    btnSend.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

  };

  // functions for the modal open/close
  const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }

  }

  const closeModalClickOnMask = event => {
    if (event.target.id === 'modalBlock') closeModal();
  }

  const openModal = () => {
    // animateModal();
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    playTest();

    window.addEventListener('click', closeModalClickOnMask);
  };

  const closeModal = () => {
    burgerBtn.classList.remove('active');
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');

    window.removeEventListener('click', closeModalClickOnMask);
  };

  // initialization
  const init = () => {

    // check size of the window
    window.addEventListener('resize', () => {
      clientWidth = document.documentElement.clientWidth;
      if (clientWidth < 768) {
        burgerBtn.style.display = 'flex';
      } else {
        burgerBtn.style.display = 'none';
      }
    });

    // listeners fo the buttons
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.add('active');

      openModal();
    });

    btnOpenModal.addEventListener('click', openModal);

    btnCloseModal.addEventListener('click', closeModal);
  };

  init();
  

})