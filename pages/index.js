const editPopup = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameInProfile = document.querySelector('.profile__title');
const jobInProfile = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');

//открыть попап
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameInProfile.textContent;
  jobInput.value = jobInProfile.textContent;
}

//закрыть
function closePopup() {
  popup.classList.remove('popup_opened');
}

//сохранить введенные значения
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInProfile.textContent = nameInput.value;
  jobInProfile.textContent = jobInput.value;
  closePopup()
}

//сохранить изменения
editPopup.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

