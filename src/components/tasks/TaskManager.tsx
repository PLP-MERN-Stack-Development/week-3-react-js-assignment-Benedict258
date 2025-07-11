import React, { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle, Circle, Trash2, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Task, TaskFilter } from '../../types';

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prev => [task, ...prev]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">Organize your tasks efficiently</p>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <Button onClick={addTask} icon={Plus} disabled={!newTask.trim()}>
              Add Task
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as TaskFilter[]).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="capitalize"
                >
                  {filterType} ({taskCounts[filterType]})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500">
              <Filter className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium">
                {searchTerm ? 'No tasks found' : filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              </p>
              <p className="text-sm mt-2">
                {searchTerm ? 'Try adjusting your search term' : 'Add a task to get started'}
              </p>
            </div>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} hover className="p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm sm:text-base ${
                    task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  icon={Trash2}
                  className="flex-shrink-0"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};