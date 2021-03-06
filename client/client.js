const handleResponse = (xhr, parseResponse) =>{
    const content = document.querySelector('#content');

    switch(xhr.status){
        default: content.innerHTML = "<b>Not implemented</b>"; break;
        case 200: content.innerHTML = "<b>Success</b>"; break;
        case 201: content.innerHTML = "<b>Created</b>"; break;
        case 204: content.innerHTML = "<b>Updated (No Content)</b>"; break;
        case 400: content.innerHTML = "<b>Bad Request</b>"; break;
        case 404: content.innerHTML = "<b>Not Found</b>"; break;
    }

    if(parseResponse){
      const jsonObj = JSON.parse(xhr.response);
      console.dir(jsonObj);
      let message; 
      content.innerHTML += `<p>${message}</p>`;
    }
    else
    {
      content.innerHTML += `<p>Metadata received </p>`;
    }

};

const requestUpdate = (e, userForm) => {
  const url = userForm.querySelector('#urlField').value;
  const method = userForm.querySelector('#methodSelect').value;

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  xhr.setRequestHeader('Accept', 'application/json');

  if(method === 'get'){
    xhr.onload = () => handleResponse(xhr, true);
  }else{
    xhr.onload = () => handleResponse(xhr, false);
  }

  xhr.send();

  e.preventDefault(); //Don't fire default event
  return false; //Prevent bubbling
};

const sendPost = (e, nameForm) => {
  e.preventDefault(); //Don't fire default event

  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');
 
  const nameField = nameForm.querySelector('#nameField');
  const ageField = nameForm.querySelector('#ageField');

  const xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr, true);

  const formData = `name=${nameField.value}&age=${ageField.value}`
  xhr.send(formData);

  return false;
}

const init = () =>{
  //setup userForm submit action
  const userForm = document.querySelector('#userForm');
  const getUsers = (e) => requestUpdate(e, userForm);
  userForm.addEventListener('submit', getUsers);
  //setup nameForm submit action
  const nameForm = document.querySelector('#nameForm');
  const addUser = (e) => sendPost(e, nameForm);
  nameForm.addEventListener('submit', addUser);
}

window.onload = init;