let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then (resp => resp.json())
    .then (json => {
    json.forEach ((toy) => {
      let card = document.createElement('div');
      let toyCollection = document.querySelector('#toy-collection');
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let button = document.createElement('button')
      let likes = toy.likes;

      button.addEventListener('click', (e) => {
        let id = e.target.id;
        console.log(e.target.id)
        likes++;
        p.textContent = (`${likes} likes!`)
        
        fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
    })
      
    })
      card.append(h2, img, p, button);
      h2.innerHTML = toy.name;
      img.classList.add('toy-avatar');
      img.src = toy.image;
      button.innerText = "Like ❤️"
      button.classList.add('like-btn')
      button.setAttribute('id', toy.id)
      p.textContent = (`${toy.likes} likes!`)

      card.classList.add('card');
      toyCollection.appendChild(card);
    })}
    )
    })

  let submit = document.querySelector('#submit');
  
  submit.addEventListener('click', (e) => {
    
  let newName = document.getElementById('newName');
  let newImage = document.getElementById('newImage');
    
    fetch ('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        "name": newName.value,
        "image": newImage.value,
        "likes": 0
      })
    })
  })
  
