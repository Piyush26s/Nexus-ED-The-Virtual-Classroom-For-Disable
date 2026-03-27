import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane, FaVolumeUp, FaRobot, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AIAssistant = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: `Hello ${user?.name || 'Learner'}! I am your AI learning companion. How can I assist you with your studies today?`, time: '10:00 AM' }
    ]);

    useEffect(() => {
        if (user?.name) {
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages.length > 0 && newMessages[0].sender === 'ai') {
                    newMessages[0].text = `Hello ${user.name}! I am your AI learning companion. How can I assist you with your studies today?`;
                }
                return newMessages;
            });
        }
    }, [user]);

    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { 
            id: Date.now(), 
            sender: 'user', 
            text: input, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        try {
            const res = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput })
            });

            if (!res.ok) throw new Error('Backend unreachabe');
            
            const data = await res.json();
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.reply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            speak(data.reply);
        } catch (err) {
            console.error("AI Assistant Error:", err);
            const errorMsg = { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "I'm having a bit of trouble connecting to my brain right now. Please try again in a moment!", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
        
        recognition.start();
    };

    return (
        <div className="page-container animate-enter" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>AI Assistant</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Powered by advanced neural learning</p>
                </div>
                <div style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>AI AGENT ONLINE</span>
                </div>
            </div>

            <div className="card-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                {/* Chat Display */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                                <div style={{ 
                                    width: '32px', height: '32px', borderRadius: '50%', 
                                    background: msg.sender === 'user' ? 'var(--brand-primary)' : 'var(--brand-secondary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem'
                                }}>
                                    {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{msg.sender.toUpperCase()}</span>
                            </div>
                            <div style={{
                                padding: '1.2rem 1.5rem',
                                borderRadius: msg.sender === 'user' ? '24px 4px 24px 24px' : '4px 24px 24px 24px',
                                background: msg.sender === 'user' ? 'var(--brand-primary)' : 'white',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                                boxShadow: 'var(--shadow-sm)',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)'
                            }}>
                                {msg.text}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>{msg.time}</span>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '1.5rem 2rem', background: 'white', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ 
                        display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-main)', 
                        padding: '0.5rem', borderRadius: '20px', border: '1px solid var(--border-medium)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                        <button 
                            onClick={startListening}
                            style={{
                                width: '45px', height: '45px', borderRadius: '50%', border: 'none',
                                background: isListening ? 'var(--danger)' : 'white',
                                color: isListening ? 'white' : 'var(--text-secondary)',
                                cursor: 'pointer', transition: 'var(--transition-smooth)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                animation: isListening ? 'pulse 1.5s infinite' : 'none'
                            }}
                        >
                            <FaMicrophone />
                        </button>
                        <input
                            style={{ flex: 1, border: 'none', background: 'transparent', padding: '1rem', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }}
                            placeholder="Ask anything about your curriculum..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            onClick={handleSend}
                            style={{
                                width: '45px', height: '45px', borderRadius: '16px', border: 'none',
                                background: 'var(--brand-primary)', color: 'white',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'var(--transition-smooth)'
                            }}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
