import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../AxiosAuth";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  const [reqUpdate, setReqUpdate] = useState(false);
  const [newCol, setNewCol] = useState({color: '', code: {hex: ''}, id: null});
  const [showAll, setShowAll] = useState(true);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  let signOut = () => {
    window.localStorage.removeItem('user-auth');
    props.history.push('/');
    props.history.go();
  }

  let submit = (e) => {
    e.preventDefault();
    axiosWithAuth().post('/api/colors', newCol)
    .then(res => { 
      setReqUpdate(!reqUpdate);
    })
    .catch(err => {
      window.alert(err);
    });
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case 'name':
        setNewCol({...newCol, color: e.target.value});
        break;
      case 'col':
        setNewCol({...newCol, code: {hex: e.target.value}});
        break;
    }

  }
  let toggle = () => {
    setShowAll(!showAll);
  }

  useEffect(() => {
    axiosWithAuth().get('/api/colors')
    .then(res => {
      setColorList(res.data);
      console.log(res.data);
    })
    .catch(err => {
      window.alert(err);
    })
  },[reqUpdate]);
  return (
    <>
    <button className='btn btn-danger ml-auto' onClick={()=> signOut()}>Sing Out</button>
    <div className='container'>
      <ColorList colors={colorList} updateColors={setColorList} update={reqUpdate} setUpdate={setReqUpdate}/>
      <form onSubmit={submit} className='colForm'>
      <input type='text' placeholder='Color Name' id='name' onChange={handleChange} required={true}/>
      <input type='color' onChange={handleChange} id='col' required={true}/>
      <button className='btn btn-primary colpick' disabled={newCol.color === ''}>Add Color</button>
      </form>
      <button className='btn btn-primary togglebtn' onClick={() => toggle()}>Toggle Bubbles</button>
      <br/>
      <Bubbles colors={colorList} showAll={showAll}/>
    </div>
    </>
  );
};

export default BubblePage;
