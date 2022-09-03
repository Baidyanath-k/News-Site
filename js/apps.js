
const linkAdd = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCard(data.data))
}

const displayCard = (items) => {

    let newsCount=document.getElementById('news-count');
    newsCount.innerText=items.length;

    items.forEach(item => {

        // console.log(item)

        let cardTitle=item.title;
        let cardDetails = item.details;
        let cardImg=item.image_url;
        let cardId=item._id;
        let cardAuthorName=item.author.name;
        let cardAuthorPublishedDate=item.author.published_date;
        let cardAuthorImg=item.author.img;
        let cardAuthorTotalView=item.total_view;
        // console.log(typeof(cardId));
        
        let cardItems=document.getElementById('card-items');

        let createCardDiv = document.createElement('div');
        createCardDiv.style.margin="28px 0";
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
                                <p>${cardAuthorPublishedDate}</p>
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

const detailsLoaded=(detailsUniqueId)=>{
    const detailUrl=`https://openapi.programming-hero.com/api/news/${detailsUniqueId}`;

    fetch(detailUrl)
    .then(res=>res.json())
    .then(detailData=>loadedDetails(detailData.data[0]))
}

const loadedDetails=uniqueData=>{
    // console.log(uniqueData);
    let uniqueDataTitle=uniqueData.title;
    let uniqueDetails=uniqueData.details;
    let uniquerThubnail=uniqueData.thumbnail_url;
    // console.log(uniqueDetails);


    let modalTitel=document.getElementById('modal-title');
    modalTitel.innerText=uniqueDataTitle;


    let modalbody=document.getElementById('main-modal-body');
    modalbody.innerText=uniqueDetails;
}

const navItemsLoaded=()=>{
    
};