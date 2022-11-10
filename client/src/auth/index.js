import { API } from '../config';

export const signup = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_DB_URL}/${process.env.REACT_APP_ADD_USER_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


// export const signin = async (user) => {
//   // console.log(name, email, password);
//   try {
//     const response = await fetch(`${process.env.REACT_APP_DB_URL}/${process.env.REACT_APP_GET_USER_EMAIL_URL}/${user.email}`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// };


export const signin = async (user) => {
  // console.log(name, email, password);
  console.log(process.env.REACT_APP_DB_URL);
  return await fetch(`${process.env.REACT_APP_DB_URL}/${process.env.REACT_APP_GET_USER_EMAIL_URL}/${user.email}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
