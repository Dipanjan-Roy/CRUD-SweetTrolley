
let globalHstData = [];
hstContent = document.getElementById("hstContentRow");

const addCard = () => {
  const newHstDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("hstTitle").value,
    type: document.getElementById("hstType").value,
    description: document.getElementById("hstDescription").value
  };

  hstContent.insertAdjacentHTML('beforeend', generateHstCard(newHstDetails));

  globalHstData.push(newHstDetails);
  saveToLocalStorage();

}

const generateHstCard = ({id, url, title, type, description}) => {
  return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-danger" name="${id}" onclick="deleteHst(this)">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <img src=${url} class="card-img-top" alt="image">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <span class="badge bg-dark">${type}</span>
      </div>

    </div>
  </div>`);
}
const saveToLocalStorage = () => {
  localStorage.setItem("hogwartssweettrolley", JSON.stringify({sweettrolley: globalHstData}));
}
const reloadHstCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("hogwartssweettrolley"));
  console.log(localStorageCopy);
  if(localStorageCopy) {
    globalHstData = localStorageCopy["sweettrolley"];
  }
  console.log(globalHstData);
  globalHstData.map((cardData) => {
      hstContent.insertAdjacentHTML('beforeend', generateHstCard(cardData));
  })
}

const deleteHst = (e) => {
  const targetID = e.getAttribute("name");
  globalHstData = globalHstData.filter((cardData) => cardData.id!==targetID);
  saveToLocalStorage();
  window.location.reload();
}
