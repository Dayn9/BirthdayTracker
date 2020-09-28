const users = {};

const respondJSON = (req, res, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(status, headers);
  res.write(JSON.stringify(object));
  res.end();
};

const respondJSONMeta = (req, res, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(status, headers);
  res.end();
};

const notFound = (req, res) => {
  const json = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respondJSON(req, res, 404, json);
};
const notFoundMeta = (req, res) => respondJSONMeta(req, res, 404);

const getUser = (req, res, params) => {
  let json = {
    message: 'Username required',
  };

  // check for name and age params
  if (!params.name) {
    json.id = 'missingParams';
    return respondJSON(req, res, 400, json);
  }

  if (!users[params.name]) {
    return notFound(req, res);
  }
  json = users[params.name]; // get the user profile

  return respondJSON(req, res, 200, json);
};

const getUserMeta = (req, res) => respondJSONMeta(req, res, 200);

const addUser = (req, res, body) => {
  const json = {
    message: 'Username required',
  };

  // check for name and age params
  if (!body.username) {
    json.id = 'missingParams';
    return respondJSON(req, res, 400, json);
  }

  let responseCode = 201; // created

  if (users[body.username]) {
    responseCode = 204; // updated
    json.message = '';
  } else {
    json.message = 'Created Successfully';
  }

  users[body.username].username = body.username;
  users[body.username].birthdays = {};

  if (responseCode === 201) {
    return respondJSON(req, res, responseCode, json);
  }
  return respondJSONMeta(req, res, responseCode);
};
const addUserMeta = (req, res) => respondJSON(req, res, 200);

const addBirthday = (req, res, body) => {
  let json = {
    message: 'Username required',
  };

  // check for name and birthday params
  if (!body.username || !body.birthday || !body.name) {
    json.id = 'missingParams';
    return respondJSON(req, res, 400, json);
  }

  // check if the username exists
  if (!users[body.username]) {
    return notFound(req, res);
  }

  // add or update the birthday
  users[body.username].birthdays[body.name].name = body.name;
  users[body.username].birthdays[body.name].birthday = body.birthday;

  json = users[body.username];
  return respondJSON(req, res, 201, json);
};
const addBirthdayMeta = (req, res) => respondJSON(req, res, 200);

module.exports = {
  getUser,
  getUserMeta,
  notFound,
  notFoundMeta,
  addBirthday,
  addBirthdayMeta,
  addUser,
  addUserMeta,
};
