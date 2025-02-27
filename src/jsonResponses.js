const users = {};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }

  response.end();
};

const getUsers = (request, response) => {
  let responseJSON = {
    users,
  };

if(request.url ==='/notReal'){

  responseJSON = {
    message:"The page you are looking for is not found",
  };
  respondJSON(request, response, 404, responseJSON);
    
  
}else{
  respondJSON(request, response, 200, responseJSON);

}

};

const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };
  responseJSON.method
  const { name, age } = request.body;

  if (!name || !age) {
    responseJSON.id = 'missing Parameters';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!users[name]) {
    responseCode = 201;
    users[name] = {
      name,
    };
  }

  users[name].age = age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSON(request, response, responseCode, {});
};

module.exports = {
  getUsers,
  addUser,
};
