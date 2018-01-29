export async function getUsers(creds)  {
  let token = creds.token;
  let organization_id = creds.user.organization_id;
  let response = await fetch('https://astinus-dev.herokuapp.com/api/v1/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
      'organization-id': organization_id
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      return(JSON.stringify(responseJson));
    })
}
