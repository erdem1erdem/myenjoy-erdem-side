import {domainUrl} from '../../constants';

const getAllPortals = object => {
  // const payload = {
  //     "portalID": "24ee9272-ce4c-45c0-8c6c-0195fa5c8ef4",
  //     "mediaType":"1"
  // }
  const payload = {macAddress: object?.macAddress};
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
  };

  return fetch(domainUrl + `/getAllPortals`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result?.success) return 1;
      else throw result?.message;
    })
    .catch(error => {
      console.error(error);
      return 0;
    });
};
const addPortal = payload => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
  };
  return fetch(domainUrl + `/addPortal`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result?.success) return 1;
      else throw result?.message;
    })
    .catch(error => {
      console.error(error);
      return 0;
    });
};

const deletePortal = payload => {
  const id = payload?.itemID;
  var requestOptions = {
    method: 'DELETE',
  };
  return fetch(domainUrl + `/deletePortal/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result?.success) return 1;
      else throw result?.message;
    })
    .catch(error => {
      console.error(error);
      return 0;
    });
};
const portal = {
  getAllPortals,
  addPortal,
  deletePortal,
};
export {portal};
