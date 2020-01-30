import React, {useEffect, useState} from 'react';
import api from './services/api';

import './App.css';
import './global.css';
import './Sidebar.css'
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
//Componente: Bloco isolado de HTML, CSS e JS que não interfere no restante da aplicação
//Propriedade: Informações de um componente pai para um filho
//Estado: Informações mantidas pelo componente (imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

 
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
      console.log(response.data);
    }

    loadDevs();
  },[])

  async function handleAddDev(data){
    const response = await api.post('/devs', data);


   setDevs([...devs, response.data])
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem  key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
