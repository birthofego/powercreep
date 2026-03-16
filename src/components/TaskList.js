import { useState } from 'react';

function TaskList({ onTaskComplete }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Hit the gym', dmg: 55, done: false },
    { id: 2, name: 'Program 1 hour', dmg: 40, done: false },
    { id: 3, name: '150g protein', dmg: 35, done: false },
    { id: 4, name: 'Walk the dog', dmg: 25, done: false },
    { id: 5, name: 'Journal entry', dmg: 50, done: false },
  ]);

  function toggleTask(id) {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
    onTaskComplete(updated);
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {tasks.map(task => (
        <div
          key={task.id}
          onClick={() => toggleTask(task.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0.7rem 0',
            borderBottom: '1px solid #1a1a1a',
            cursor: 'crosshair',
            opacity: task.done ? 0.4 : 1,
          }}
        >
          <div style={{
            width: '16px', height: '16px',
            border: `1px solid ${task.done ? '#b8ff00' : '#4a4845'}`,
            background: task.done ? 'rgba(184,255,0,0.1)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', color: '#b8ff00', flexShrink: 0,
          }}>
            {task.done ? '✓' : ''}
          </div>
          <span style={{
            fontFamily: 'monospace', fontSize: '0.82rem',
            color: task.done ? '#4a4845' : '#e2ddd4',
            textDecoration: task.done ? 'line-through' : 'none',
            flex: 1,
          }}>
            {task.name}
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: '#ff4820' }}>
            +{task.dmg} ATK
          </span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;