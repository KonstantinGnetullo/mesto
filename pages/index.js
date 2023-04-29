//попап изменения профиля
const popupEdit = document.querySelector('.popup_edit');
const editPopupOpen = document.querySelector('.profile__edit-btn');
const editPopupClose = popupEdit.querySelector('.popup__close-btn');
const profileForm = document.forms['profile-form'];
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const nameInProfile = document.querySelector('.profile__title');
const jobInProfile = document.querySelector('.profile__subtitle');
//попап добавить карточку место
const popupCreate = document.querySelector('.popup_new-place');
const createPopupOpen = document.querySelector('.profile__add-btn');
const createPopupClose = popupCreate.querySelector('.popup__close-btn');
const cardForm = document.forms['card-form'];
const textInput = cardForm.querySelector('.popup__input_type_nameplace');
const imageInput = cardForm.querySelector('.popup__input_type_image');


//универсальная функция открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//универсальный обработчик крестиков (кнопок закрытия)
const closeButtons = document.querySelectorAll('.popup__close-btn');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//попап-1: изменения данных профиля
editPopupOpen.addEventListener('click', function() {
  nameInput.value = nameInProfile.textContent;
  jobInput.value = jobInProfile.textContent;
  openPopup(popupEdit);
});

function handleProfileFormSubmit(evt) { //передать значения в форму и закрыть
  evt.preventDefault();
  nameInProfile.textContent = nameInput.value;
  jobInProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit); //сохранить изменения


//попап-2: добавления карточки
createPopupOpen.addEventListener('click', function() {
  openPopup(popupCreate);
});

function handleFormAddSubmit(evt) { //передать значения в форму
  evt.preventDefault();
  const newArr = {name: textInput.value, link: imageInput.value};
  const element = createCardElement(newArr);
  cardsContainer.prepend(element);
  cardForm.reset();
  closePopup(popupCreate);
}

cardForm.addEventListener('submit', handleFormAddSubmit); //сохраняем новую карточку


//работа с темплейт, лайк и удаление карточек
const cardTemplate = document.getElementById('card-template');
const cardsContainer = document.querySelector('.elements');

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDeleteButton = cardElement.querySelector('.element__btn-delete');
  const cardLikeButton = cardElement.querySelector('.element__btn-like');
  //popup image
  const popupImage = document.querySelector('.popup_image');
  const imagePopupClose = popupImage.querySelector('.popup__close-btn');
  const popupImagePicture = popupImage.querySelector('.popup__picture');
  const popupImageCaption = popupImage.querySelector('.popup__picture-caption');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => { //удаление
    cardElement.remove();
  };

  const handleLike = (evt) => { //лайк
    cardLikeButton.classList.toggle('element__btn-like_active');
  };

  function zoom() {
    openPopup(popupImage);
    popupImagePicture.src = cardData.link;
    popupImagePicture.alt = cardData.alt;
    popupImageCaption.textContent = cardData.name;
  }

  cardImage.addEventListener('click', zoom);
  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
};

//вызываем карточки с содержимым из массива
initialCards.forEach((card) => {
  const element = createCardElement(card);
  cardsContainer.prepend(element);
});