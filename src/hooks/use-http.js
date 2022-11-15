import { useState } from 'react';

const useHttp = function (httpHandler) {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async (url, opt = {}) => {
    fetch(url, opt)
      .then(response => {
        if (response.ok === false) {
          throw new Error('Something went wrong (at use-http)');
        } else {
          console.log('Success!');
          return response.json();
        }
      })
      .then(data => {
        setResponse(httpHandler(data));
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  };

  return {
    response,
    fetchData,
    error,
  };
};

export default useHttp;
