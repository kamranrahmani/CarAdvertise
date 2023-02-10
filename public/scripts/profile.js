const carFormBtn = document.getElementById('carformbtn');
const formElement = document.getElementById('form');
const btnSubmit = document.getElementById('btn-submit');
const errorText = document.getElementById('error');
const successmsg = document.getElementById('success');
const carHistoryBtn = document.getElementById('carhistory');
const historyContainer = document.getElementById('history-container');



carHistoryBtn.addEventListener('click', loadcars);

carFormBtn.addEventListener('click',function(){
    successmsg.classList.add('hidden');
    formElement.classList.remove('hidden');
    historyContainer.classList.add('hidden');
});

formElement.addEventListener('submit',sendCarDetails);


loadcars();

const deleteBtns = document.getElementsByClassName('delete');
for(let i = 0; i < deleteBtns.length; i++){
    deleteBtns[i].addEventListener('click',deleteCar);
}

async function sendCarDetails (event){
    event.preventDefault();
    errorText.classList.add('hidden');
    
    const formData = new FormData(formElement);

    const response = await fetch('/savecar', {
        method:'POST',
        body:formData,
    });
    const msg = await response.json();
    if(!response.ok){
        errorText.textContent = msg.text;
        errorText.classList.remove('hidden');
        return 
    }
    formElement.classList.add('hidden');
    successmsg.classList.remove('hidden');
    successmsg.textContent = msg.text;

    }

async function loadcars(){
    historyContainer.classList.remove('hidden');
    formElement.classList.add('hidden');
    successmsg.classList.add('hidden');
    const response = await fetch('/loadusercars');
    const data = await response.json();
    let items = '';
    if(response.ok){
        for(let i = 0; i < data.length; i++){
            let item =  `<div
            class="relative flex flex-col rounded-lg shadow-xl overflow-hidden group"
          >

            <form action="/:id/delete" method="POST" class="delete bg-red-500 px-4 py-2 text-white text-center z-50 w-1/3 rounded-l top-0 left-0 hover:bg-red-800 duration-200">
            <input type="text" value="${data[i].id}" name="carId" hidden />
            <button type="submit" class="w-full">
                Delete</button>
            </form>

            
              <img
                src= ${data[i].images[0].address}
                alt="car image"
                class="object-fit group-hover:scale-110 duration-200 w-full h-56"
              />
            <div id="details" class="p-2">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">${data[i].brand.brandName} ${data[i].model.modelName}</h2>
                <p class="text-xl">price: ${data[i].price}$</p>
              </div>
              <p>${data[0].year}</p>
            </div>
          </div>`
         items += item; 
        }
        historyContainer.innerHTML = items;
    }


}

async function deleteCar(event){
    const btn = event.target;
    const id = btn.dataset.id;
    console.log('id is '+ id);
    const response = await fetch(`/${id}/delete`, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        loadcars();
    }else{
        alert('something went wrong!');
    }

}















