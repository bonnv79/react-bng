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
    fetch(getUrl('/api/record'))
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

        <div className='container'>
          <table className='table'>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Position</td>
                <td>Level</td>
              </tr>
              {
                data?.map(item => {
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td>{item.level}</td>
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
