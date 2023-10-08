import './App.css';
import logo from './assets/logo.svg';
import add from './assets/add.png';
import message from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import send from './assets/send.svg';
import user from './assets/user.png';
import logo_icon from './assets/logo_icon.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const messageEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Hi, I am ChatGPT, a state of art and language model developed by Himanshu Mahajan.',
      isBot: true,
    }
  ])

  // When messages are changed then this useEffect function will work
  useEffect(() => {
    messageEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      }
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      },
      {
        text: res,
        isBot: true
      }
    ]);
  }

  const handleEnter = async (event) => {
    if (event.key === 'Enter') await handleSend();
  }

  const handleQuery = async (event) => {
    const text = event.target.value;
    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      }
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {
        text: text,
        isBot: false
      },
      {
        text: res,
        isBot: true
      }
    ]);
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={logo} alt='Logo' className='logo' />
            <span className='brand'>ChatBot</span>
          </div>
          <button className='midBtn' onClick={() => {window.location.reload()}}><img src={add} alt='New Chat' className='addBtn' />New Chat</button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handleQuery} value={'What is Programming?'}><img src={message} alt='Message' />What is Programming?</button>
            <button className='query' onClick={handleQuery} value={'How to use an API?'}><img src={message} alt='Message' />How to use an API?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'>
            <img src={home} alt='Home' className='listItemsImg' />Home
          </div>
          <div className='listItems'>
            <img src={saved} alt='Saved' className='listItemsImg' />Saved
          </div>
          <div className='listItems'>
            <img src={rocket} alt='Upgrade' className='listItemsImg' />Upgrade to Pro
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {/* <div className='chat'>
            <img className='chatimg' src={user} alt='user-icon' /><p className='txt'>User response</p>
          </div>
          <div className='chat bot'>
            <img className='chatimg' src={logo_icon} alt='logo-icon' /><p className='txt'>Bot response</p>
          </div> */}
          {messages.map((message, index) => {
            return (
              <div key={index} className={message.isBot ? 'chat bot' : 'chat'}>
                <img className='chatimg' src={message.isBot ? logo_icon : user} alt='logo-icon' /><p className='txt'>{ message.text }</p>
              </div>
            )
          })}
          <div ref={messageEnd} />
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' placeholder='Send a message...' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} /><button className='send' onClick={handleSend}><img src={send} alt='Send' className='sendBtn' /></button>
          </div>
          <p>Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
