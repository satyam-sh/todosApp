import { useState } from "react"
import {v4 as idNumber} from "uuid"
import {CgMathPlus} from "react-icons/cg"
import {TiTick} from "react-icons/ti"
import {RiDeleteBin2Fill} from "react-icons/ri"
import "./App.css"


const alltodos = JSON.parse(localStorage.getItem('MYTODOS'));
let  completed = [];
let incompleted = []
if (alltodos === null) {completed = []
   incompleted = []
}
else {completed = alltodos.filter(e => e.isTicked)
  alltodos.filter(e => !e.isTicked)
}



      // setTodoArr(incompleted);
      // setCompletedTodos(completed);

function App (){
  const [addTodo , toggleAddTodo] = useState(false); 
  const [todoArr ,setTodoArr] = useState(incompleted);
  const [isTicked ,setIsTicked] = useState(false);
  const [completedTodos ,setCompletedTodos] = useState(completed);
  
  const [topic ,setTopic] = useState('');
  const [description, setDescription] = useState('');
  
  
  function filter (){
    const alltodos = JSON.parse(localStorage.getItem('MYTODOS'));
  const completed = alltodos.filter(e => e.isTicked);
  const incompleted = alltodos.filter(e => !e.isTicked)
  setTodoArr(incompleted);
  setCompletedTodos(completed);
  }


  const createTodo = () => {
    toggleAddTodo(!addTodo) ;
  };


const makeTodos =() =>{
  let a = JSON.parse(localStorage.getItem('MYTODOS'))

  if (a === null) a = [];
  
  const newTodo = {
    id : idNumber(),
    topic,description,isTicked
  };
  a.push(newTodo)
  localStorage.setItem('MYTODOS',JSON.stringify(a));
  // const res = JSON.parse(localStorage.getItem('MYTODOS'));
  // setTodoArr(res)
  filter()
  setDescription('');
  setTopic('');
  
  
}


const deleteTodo = (todoId) =>{
  const a = JSON.parse(localStorage.getItem('MYTODOS'))
    const newTodoList = a.filter(e => e.id !== todoId);
    localStorage.setItem("MYTODOS", JSON.stringify(newTodoList));
    filter()


  }
  
  const markAsCompleted = (ID) =>{
    
    const a = JSON.parse(localStorage.getItem("MYTODOS"));
    const b = a.map(e => {
      if (e.id === ID) return {...e , isTicked : !e.isTicked}
      else return e ;
    })
    localStorage.setItem("MYTODOS" , JSON.stringify(b));
    
    setTodoArr(JSON.parse(localStorage.getItem('MYTODOS')))
    filter();
  }
const getColor =(val) => {
  
  return val ? 'green' : 'red';
}
  return (
    <div className="container">
      <h1>My Tasks</h1>
      <hr />
      <div className="todoListContainer">
        {!addTodo && <button className="addTodoBtn" onClick={createTodo}><CgMathPlus /></button>}
        {addTodo &&
        <div className="todoAdderContainer"> 
          <div className="userInputContainer">
            <label>Topic</label>
            <input type='text' onChange={(e) => setTopic(e.target.value)} value={topic}/>
          </div>
          <div className="userInputContainer">
            <label>Description</label>
            <textarea onChange={(e)=> setDescription(e.target.value)} value={description}/>
          </div>
          
          <div className="buttons">
          <button className="saveTodo" onClick={makeTodos}>Save</button>
          <button className="saveTodo" onClick={()=> toggleAddTodo(!addTodo)}>Cancel</button>
          </div>
        </div>}
        {todoArr.length > 0 ? <ul className="todoLists">
          {todoArr.map(e => <li key={e.id}>
            
              <div className="eachTodoContainer">
                  <h1 className="topicHeading">{e.topic}</h1> 
                  <p className="topicPara">{e.description}</p>
              </div>
              <div>
                <button className="deleteBtn" onClick={()=> deleteTodo(e.id)}><RiDeleteBin2Fill /></button>
                <button className="tickBtn" onClick={()=>markAsCompleted(e.id)} style={{color: getColor(e.isTicked) }}><TiTick /></button>
              </div>
          </li>)}
          </ul> : <p className="topicPara">Nothing has been added yet.</p>}
          {completedTodos && <ul>
            {completedTodos.map(e => <li className="eachTodoContainerC" key ={e.id}>
              <div className="eachTodoContainer">
                  <h1 className="topicHeading">{e.topic}</h1> 
                  <p className="topicPara">{e.description}</p>
              </div>
              <div>
                <button className="deleteBtn" onClick={()=> deleteTodo(e.id)}><RiDeleteBin2Fill /></button>
                <button className="tickBtn" onClick={()=>markAsCompleted(e.id)} style={{color: getColor(e.isTicked) }}><TiTick /></button>
              </div>

            </li>)}
            </ul>}
          
      </div>
    </div>
  )
}
export default App