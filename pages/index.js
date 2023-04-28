const popup = document.querySelector('.popup');
//попап изменения профиля
const popupEdit = document.querySelector('.popup_edit');
const editPopupOpen = document.querySelector('.profile__edit-btn');
const editPopupClose = popupEdit.querySelector('.popup__close-btn');

const formElement = popupEdit.querySelector('.popup__form_edit');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const nameInProfile = document.querySelector('.profile__title');
const jobInProfile = document.querySelector('.profile__subtitle');
//попап добавить карточку место
const popupCreate = document.querySelector('.popup_new-place');
const createPopupOpen = document.querySelector('.profile__add-btn');
const createPopupClose = popupCreate.querySelector('.popup__close-btn');

const formCreateElement = popupCreate.querySelector('.popup__form_new-place');
const textInput = formCreateElement.querySelector('.popup__input_type_nameplace');
const imageInput = formCreateElement.querySelector('.popup__input_type_image');


//тогл попапов
//универсальная функция тоглим попапы
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//попап изменения профиля открыть-закрыть
editPopupOpen.addEventListener('click', function() {
  nameInput.value = nameInProfile.textContent;
  jobInput.value = jobInProfile.textContent;
  togglePopup(popupEdit);
});

editPopupClose.addEventListener('click', function() {
  togglePopup(popupEdit);
});

function handleFormSubmit(evt) { //передать значения в форму
  evt.preventDefault();
  nameInProfile.textContent = nameInput.value;
  jobInProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); //сохранить изменения


// попап добавления карточки
createPopupOpen.addEventListener('click', function() {
  togglePopup(popupCreate);
});

createPopupClose.addEventListener('click', function() {
  togglePopup(popupCreate);
})

function handleFormAddSubmit(evt) { //передать значения в форму
  evt.preventDefault();
  const newArr = {name: textInput.value, link: imageInput.value};
  const element = createCardElement(newArr);
  cardsContainer.prepend(element);
  formCreateElement.reset();
  togglePopup(popupCreate);
}

formCreateElement.addEventListener('submit', handleFormAddSubmit); //сохраняем новую карточку


//работа с темплейт и удаление карточек
const cardTemplate = document.getElementById('card-template');
const cardsContainer = document.querySelector('.elements');

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDeleteButton = cardElement.querySelector('.element__btn-delete');
  const cardLikeButton = cardElement.querySelector('.element__btn-like');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = (evt) => {
    cardLikeButton.classList.toggle('element__btn-like_active');
  };

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
};

//вызываем карточки с содержимым из массива
initialCards.forEach((card) => {
  const element = createCardElement(card);
  cardsContainer.prepend(element);
});


//popup image
const popupImage = document.querySelector('.popup_image');
const imagePopupOpen = document.querySelectorAll('.element__image');
const imagePopupClose = popupImage.querySelector('.popup__close-btn');
const popupImagePicture = popupImage.querySelector('.popup__picture');
const popupImageCaption = popupImage.querySelector('.popup__picture-caption');

// открываем попап-картинку
imagePopupOpen.forEach((elementImage) => {
  elementImage.addEventListener('click', () => {
    popupImagePicture.src = elementImage.src;
    popupImagePicture.alt = elementImage.alt;
    popupImageCaption.textContent = elementImage.alt;
    togglePopup(popupImage);
  });
});

imagePopupClose.addEventListener('click', function() {
  togglePopup(popupImage);
});