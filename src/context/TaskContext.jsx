import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { STATUS } from '../constants/task';
import { loadTasks, saveTasks } from '../services/taskService';
import { createId } from '../utils/tasks';

const TaskContext = createContext(null);

const ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
  TOGGLE: 'toggle',
};

const reducer = (tasks, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...tasks, action.task];
    case ACTIONS.UPDATE:
      return tasks.map((t) => (t.id === action.id ? { ...t, ...action.changes } : t));
    case ACTIONS.DELETE:
      return tasks.filter((t) => t.id !== action.id);
    case ACTIONS.TOGGLE:
      return tasks.map((t) =>
        t.id === action.id
          ? { ...t, status: t.status === STATUS.COMPLETED ? STATUS.IN_PROGRESS : STATUS.COMPLETED }
          : t,
      );
    default:
      return tasks;
  }
};

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, undefined, loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback(
    (data) =>
      dispatch({
        type: ACTIONS.ADD,
        task: { ...data, id: createId(), status: STATUS.IN_PROGRESS, createdAt: new Date().toISOString() },
      }),
    [],
  );
  const updateTask = useCallback((id, changes) => dispatch({ type: ACTIONS.UPDATE, id, changes }), []);
  const deleteTask = useCallback((id) => dispatch({ type: ACTIONS.DELETE, id }), []);
  const toggleTask = useCallback((id) => dispatch({ type: ACTIONS.TOGGLE, id }), []);

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, toggleTask }),
    [tasks, addTask, updateTask, deleteTask, toggleTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside <TaskProvider>');
  return ctx;
};
