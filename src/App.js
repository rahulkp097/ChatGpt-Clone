import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openAI';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [input,setInput]=useState("")
  const msgEnd=useRef(null)
  const [messages,setMessages]=useState([{
    text: " Hi how can i help you",
    isBot: true
  }])

 
  useEffect(()=>{
msgEnd.current.scrollIntoView()
  },[messages])
  const handleSend=async()=>{
    const text=input
    setInput("")
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res= await sendMsgToOpenAI(text)
    console.log("res",res)
    setMessages([...messages,{text,isBot:false},
      {text:res,isBot:true}])
  }

  const handleEnter= async(e)=>{
    if(e.key==="Enter") await handleSend()
  }
  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);
    
    try {
      const res = await sendMsgToOpenAI(text);
      console.log("res", res);
      setMessages([
        ...messages,
        { text, isBot: false },
        { text: res, isBot: true }
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully, such as displaying an error message to the user
    }
  };
  
  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} className='logo' alt='logo'/>
            <span className='brand'>Chat GPT</span>
            <button className='midBtn' onClick={()=>window.location.reload()}>
              <img src={addBtn} alt='addbutton' className='addBtn'/> new Chat
            </button>
            <div className='upperSideBottom'>
              <button className='query'onClick={handleQuery} value={"what is programming"}> <img src={msgIcon} alt='' />what is programming</button>
              <button className='query' onClick={handleQuery} value={"How to use an API ?"}>  <img src={msgIcon} alt='' />How to use an API ?</button>
            </div>
          </div>
        </div>
        <div className='listItems'> <img src={home} alt='' className='listItemsImg'/> Home</div>
        <div className='listItems'> <img src={saved} alt='' className='listItemsImg'/> Saved</div>
        <div className='listItems'> <img src={rocket} alt='' className='listItemsImg'/> Upgrade to pro</div>
      </div>
      <div className='main'>
        <div className='chats'>
      
        
          {messages.map((message,i)=>(
  <div key={i} className= {message.isBot?"chat bot" :"chat"}>
  <img className='chatImg' src={message.isBot ?gptImgLogo :userIcon} alt='gpt'/>
  <p className='text'>{message.text}</p>
</div>
          ))}
          <div ref={msgEnd}/>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>setInput(e.target.value)}/>
            <button className='send' onClick={handleSend}> <img src={sendBtn} alt='send' /> </button>
          </div>
          <p>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
