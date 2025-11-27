import React, { useState, useEffect } from 'react';
import { Plus, X, Check } from 'lucide-react';

const Todo = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('momentum_todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('momentum_todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div className="glass-panel" style={{ padding: '20px', maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '10px' }}>Today</h3>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
                {todos.length === 0 && <p style={{ opacity: 0.7, textAlign: 'center' }}>No tasks yet.</p>}
                {todos.map(todo => (
                    <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', opacity: todo.completed ? 0.6 : 1 }}>
                        <button
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                background: 'transparent', border: '1px solid white', borderRadius: '50%',
                                width: '20px', height: '20px', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white'
                            }}
                        >
                            {todo.completed && <Check size={12} />}
                        </button>
                        <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                        <button onClick={() => removeTodo(todo.id)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }}>
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={addTodo} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="New Todo"
                    style={{
                        background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px',
                        padding: '8px', color: 'white', flex: 1, outline: 'none'
                    }}
                />
            </form>
        </div>
    );
};

export default Todo;
