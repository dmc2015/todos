document.querySelector("#list-container").addEventListener('click', (evt) => {
    console.log('in event')

    if (evt.target.name === 'check_box') {
        var id = evt.target.attributes['data-id'].value
        // fetch("patch")
    }

    var reqBody = {checked: evt.target.checked }
    // JSON.stringify(reqBody)
    
    fetch('http://localhost:4000' + "/items/patch/" + id, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json"}
  }).then(function(response){
    response.json().then(function(todo){
      console.log(todo)
    })
  })//.bind(this)

})

console.log('test')