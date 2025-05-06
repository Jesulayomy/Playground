document.querySelector('button').addEventListener('click', getWuTangnames);

function getWuTangnames() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  fetch(`/api/wu-tang-clan?firstName=${firstName}&lastName=${lastName}`)
    .then(res => res.json())
    .then(data => {
      if (data.names) {
        document.querySelector('h6').innerText = `${firstName} ${lastName}, from this day forward you wll also be known as`;
        document.querySelector('h2').innerText = `${data.names.wuTangFirstName} ${data.names.wuTangLastName}`;
      } else {
        document.querySelector('h6').innerText = '';
        document.querySelector('h6').innerHTML = `<span class="red">Please enter a first and last name</span>`;
        document.querySelector('h2').innerText = ``;
      }
    })
    .catch(err => console.log(err));
}