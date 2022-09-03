const linkAdd = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayCard(data.data))
}

const displayCard = (items) => {
  let newsCount = document.getElementById('news-count');
  newsCount.innerText = items.length;

  let cardItems = document.getElementById('card-items');
  cardItems.innerHTML = '';

  items.forEach(item => {

    let cardTitle = item.title;
    let cardDetails = item.details;
    let cardImg = item.image_url;
    let cardId = item._id;
    let cardAuthorName = item.author.name;
    let cardAuthorPublishedDate = item.author.published_date;
    let cardAuthorImg = item.author.img;
    let cardAuthorTotalView = item.total_view;

    let createCardDiv = document.createElement('div');

    createCardDiv.style.margin = "28px 0";
    createCardDiv.classList.add('card');

    createCardDiv.innerHTML = `
        
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${cardImg}" class="img-fluid rounded-start w-100 h-100" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <div class="cards-header">
                        <h5 class="card-title fs-3 py-2">${cardTitle}</h5>
                    </div>
                    <div class="cards-body">
                        <p class="card-text">${(cardDetails).slice(0,250).concat('...')}</p>
                    </div>
                    <div class="cards-footer d-flex justify-content-between my-3">
                        <div class="card-footer-one d-flex justify-content-between">
                            <div class=card-footer-one-img>
                                <img src="${cardAuthorImg}" class="img-fluid rounded-circle " alt="..." style="width:50px; height:50px; overflow:hidden">
                            </div>
                            <div class="card-footer-text ms-2">
                                <h5>${cardAuthorName ? cardAuthorName:"Name is not found"}</h5>
                                <p>${cardAuthorPublishedDate ? cardAuthorPublishedDate: "Not found"}</p>
                            </div>
                        </div>
                        <div class="card-footer-two d-flex justify-content-between" style="gap:4px">
                            <i class="fa-solid fa-eye" style="font-size:26px"></i>
                            <h5>${cardAuthorTotalView ? cardAuthorTotalView: 0}</h5>
                        </div>
                        <div class="card-footer-three">
                            <button type="button" class="common-btn" data-bs-toggle="modal" data-bs-target="#unique-modal" onclick="detailsLoaded('${cardId}')">Details</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        `;

    cardItems.appendChild(createCardDiv)
  });
};
linkAdd("08");

const detailsLoaded = (detailsUniqueId) => {
  const detailUrl = `https://openapi.programming-hero.com/api/news/${detailsUniqueId}`;
  fetch(detailUrl)
    .then(res => res.json())
    .then(detailData => loadedDetails(detailData.data[0]))
}

const loadedDetails = uniqueData => {
  let uniqueDataTitle = uniqueData.title;
  let uniqueDetails = uniqueData.details;
  let uniquerThubnail = uniqueData.thumbnail_url;


  let modalTitel = document.getElementById('modal-title');
  modalTitel.innerText = uniqueDataTitle;


  let modalbody = document.getElementById('main-modal-body');
  modalbody.innerText = uniqueDetails;
}

const navItemsLoaded = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then(res => res.json())
    .then(data => navItemsDisplay(data.data.news_category))
};

const navItemsDisplay = (navItems) => {
  let navsDiv = document.getElementById('navs');
  navsDiv.innerHTML = `
        
        <nav class="navbar navbar-expand-lg">
        <div class="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbar-nav" aria-controls="navbar-nav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar-nav">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[0].category_id}')">${navItems[0].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[1].category_id}')">${navItems[1].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[2].category_id}')">${navItems[2].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[3].category_id}')">${navItems[3].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[4].category_id}')">${navItems[4].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[5].category_id}')">${navItems[5].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[6].category_id}')">${navItems[6].category_name}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="linkAdd('${navItems[7].category_id}')">${navItems[7].category_name}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
         
        `;
}
navItemsLoaded();

document.getElementById('blog-details').innerHTML = `

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-xl">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">More Information</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" style="text-align:left">
      <div class="first-question mb-4">
        <h2>Difference between var, let and const keywords in JavaScript?</h2>
        <p>
          var: The scope of a var variable is functional scope. It can be updated and re-declared into the scope. It can be declared without initialization. It can be accessed without initialization as its default value is “undefined”.
        </p>
        <p>
          let: The scope of a let variable is block scope. It can be updated but cannot be re-declared into the scope. It can be declared without initialization. It cannot be accessed without initialization otherwise it will give "referenceError".
        </p>
        <p>
          const: The scope of a const variable is block scope. It cannot be updated or re-declared into the scope. It cannot be declared without initialization. It cannot be accessed without initialization, as it cannot be declared without initialization.
        
        </p>
      </div>
      <div class="second-question mb-4">
        <h2>Difference between arrow function and regular function in JavaScript?</h2>
        <p>Unlike regular functions, arrow functions do not have their own "this".</p>
        <p>Arguments objects are not available in arrow functions, but are available in regular functions.</p>
        <p>Regular functions are constructible, they can be called using the ‘new’ keyword. However, the arrow functions are only "callable" and not constructible.</p>
      </div>

      <div class="second-question">
        <h2>Difference between .map(), .forEach(), filter and find in JavaScript?</h2>
        <p>.map(): .map() executes the same code on every element in an array and returns a new array with the updated elements.</p>
        <p>forEach(): .forEach(), is used to execute the same code on every element in an array but does not change the array and it returns undefined.</p>
        <p>.filter(): .filter() checks every element in an array to see if it meets a certain criteria and returns a new array with the elements that return truthy for the criteria.</p>
        <p>.find(): .find() is also a search function like the previous but they differ in one small detail — this function returns only one match in an array. If in an array is more than one result, the function will return the first that has matched.</p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>

`;