import { useState } from 'react';

const useHttp = function (httpHandler) {
  const [response, setResponse] = useState([]);

  const fetchData = async (url, opt = {}) => {
    fetch(url, opt)
      .then(response => response.json())
      .then(data => {
        setResponse(httpHandler(data));
      });
  };

  return {
    response,
    fetchData,
  };
};

export default useHttp;
