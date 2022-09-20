const itemsUl = document.querySelector('.todo-list .list')
const addTodo = document.querySelector('#add-todo');
const clearCompleted = document.querySelector('.delete-todos');
const filters = document.querySelectorAll('.filters');
const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed= document.querySelector('#completed');
const counter = document.querySelector('.counter');
const allLis = [];


addTodo.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        if (!this.value) return;

        const {value, checked} = e.target;
        const formData = {
         ['item']: value,
         ['checked']: checked
     }
      allLis.push(formData);
      countItemsLeft();
       newLi(e, formData);
    } 
});

const newLi = (e, formData) =>{

    const newItemText = e.target.value;
    const divLi = document.createElement('div')
    const hr = document.createElement('hr')
    const deleteLi = document.createElement('img')
    deleteLi.setAttribute('src', './dist/images/icon-cross.svg')
    deleteLi.classList.add('delete')
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('id', 'check-box')
    divLi.appendChild(checkBox)
    
    const newItemLi = document.createElement('li');
    newItemLi.innerText = newItemText;
    divLi.appendChild(newItemLi)
    divLi.appendChild(deleteLi)
    itemsUl.appendChild(divLi)
    itemsUl.appendChild(hr)    
    e.target.value = '';

   ckBx(formData, checkBox, divLi);
   dltLi(formData, deleteLi, divLi);
   clrCmpltd();  
};

filters.forEach(filter  => {
    filter.addEventListener('click', function({target}) {
      const current = document.querySelector('.active'); 
      // If class active exists 
          if(current !== null) {
            current.classList.remove('active');
          }
          //If class active does not exist
          target.classList.add('active');
       }) 
});

all.addEventListener('click', () => {
    const createdDivs = document.querySelectorAll('.list div');
    for(let createdDiv of createdDivs) {
        if(createdDiv.classList.contains('hide')) {
            console.log(createdDivs);
            createdDiv.nextElementSibling.classList.remove('hide');
            createdDiv.classList.remove('hide');
        }
    }
});

const clickActive = () => {
    const createdDivs = document.querySelectorAll('.list div');
    for(let createdDiv of createdDivs) {
        if(createdDiv.classList.contains('li-checked')) {
            console.log(createdDivs);
            createdDiv.nextElementSibling.classList.add('hide');
            createdDiv.classList.add('hide');
        }
        else{
            createdDiv.nextElementSibling.classList.remove('hide');
            createdDiv.classList.remove('hide');
        }
    }
};

active.addEventListener('click', clickActive);

const clickCompleted = () => {
    const createdDivs = document.querySelectorAll('.list div');
    for(let createdDiv of createdDivs) {
        if(!createdDiv.classList.contains('li-checked')) {
            console.log(createdDiv);
            createdDiv.nextElementSibling.classList.add('hide');
            createdDiv.classList.add('hide');
        }
        else{
            createdDiv.nextElementSibling.classList.remove('hide');
            createdDiv.classList.remove('hide');
        }
    }
};

completed.addEventListener('click', clickCompleted);

const countItemsLeft = () => {
    const itemsLeft = [];
    allLis.forEach(li => {
        if(!li.checked) {
            itemsLeft.push(li);
        }
    })
    if(itemsLeft.length > 1){
        counter.innerText = `${itemsLeft.length} items left`;
    }
    else {
        counter.innerText = `${itemsLeft.length} item left`;
    }
}

const ckBx = (formData, checkBox, divLi) => {
    checkBox.addEventListener('click', ({target}) =>{
        const idx = allLis.indexOf(formData)
        if(target.checked){
                    divLi.classList.add('li-checked')
                    allLis[idx].checked = target.checked;
        }
        else{
                divLi.classList.remove('li-checked')
                allLis[idx].checked = target.checked;
        }

        if(target.checked && active.classList.contains('active')) {
              clickActive();
        }
        if(!target.checked && completed.classList.contains('active')) {
               clickCompleted();
        }
        countItemsLeft();
       
    })
};



const dltLi = (formData, deleteLi, divLi) => {
    deleteLi.addEventListener('click', ()=> {
        const idx = allLis.indexOf(formData)
        divLi.nextElementSibling.remove();
        divLi.remove();
        allLis.splice(idx, 1);
        countItemsLeft();
    })
};

const clrCmpltd = () => {
    clearCompleted.addEventListener('click', () => {
        const createdDivs = document.querySelectorAll('.list div');
    
        for(let createdDiv of createdDivs) {
            if(createdDiv.classList.contains('li-checked')) {
                createdDiv.nextElementSibling.remove();
                createdDiv.remove();
            }
        }
    
        allLis.forEach((li, liIdx) => {
            if(li.checked){
             allLis.splice(liIdx, 1);
            }
        })
    
    })
};

const section = document.querySelector('section');
const toggle = document.querySelector('.img');

toggle.addEventListener('click', () => {
    section.classList.toggle('light');
});