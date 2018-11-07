document.querySelector("#list-container").addEventListener('click', (evt) => {
    console.log('in event')

    if (evt.target.name === 'check_box') {
        var id = evt.target.attributes['data-id'].value
        // fetch("patch")
    }
    http://localhost:3001/items"
    var reqBody = {checked: evt.target.checked }
    // JSON.stringify(reqBody)
    var url = window.location.href + "/patch/" + id
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json; charset=utf-8"},
        referrer: "no-referrer"
  }).then( response => response.json())
    // response.json().then(function(todo){
    //   console.log(todo)
    // })
//.bind(this)

})

console.log('test')