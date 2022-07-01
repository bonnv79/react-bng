import logo from './logo.svg';
import './App.css';
import { getUrl } from './utils';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const handleGet = () => {
    setLoading(true);
    fetch(getUrl('/api/product'))
      .then(response => response.json())
      .then(res => {
        console.log('Success:', res);
        setData(res);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!data) {
      handleGet();
    }
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="button"
          onClick={handleGet}
        >
          Refesh Data
        </button>

        <h3>{data?.message}</h3>
        {data?.version && <span>V{data?.version}</span>}

        <div className='container'>
          <table className='table'>
            <tbody>
              <tr>
                <td>
                  ID
                </td>
                <td>
                  Name
                </td>
              </tr>
              {
                data?.data?.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </header>

      <Loading open={!data || loading} />
    </div>
  );
}

export default App;
