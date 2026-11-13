import { useCallback, useMemo, useState } from 'react';
import SearchView from './components/search/SearchView';
import TaskForm from './components/tasks/TaskForm';
import { useTasks } from './context/TaskContext';
import { hasSeenOnboarding, markOnboardingSeen } from './services/preferencesService';
import AllWeeksScreen from './screens/AllWeeksScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [onboarded, setOnboarded] = useState(hasSeenOnboarding);
  const [screen, setScreen] = useState('home'); // 'home' | 'search' | 'weeks'
  // null = closed · { date } = creating · { task } = editing
  const [form, setForm] = useState(null);

  const openEdit = useCallback((task) => setForm({ task }), []);
  const closeForm = useCallback(() => setForm(null), []);
  const goHome = useCallback(() => setScreen('home'), []);

  const taskActions = useMemo(
    () => ({ onToggle: toggleTask, onEdit: openEdit, onDelete: deleteTask }),
    [toggleTask, openEdit, deleteTask],
  );

  const handleStart = () => {
    markOnboardingSeen();
    setOnboarded(true);
  };

  const handleSubmit = (data) => (form?.task ? updateTask(form.task.id, data) : addTask(data));

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white shadow-xl">
      {!onboarded ? (
        <OnboardingScreen onStart={handleStart} />
      ) : (
        <>
          {screen === 'home' && (
            <HomeScreen
              tasks={tasks}
              taskActions={taskActions}
              onSearch={() => setScreen('search')}
              onViewAll={() => setScreen('weeks')}
              onAdd={(date) => setForm({ date })}
            />
          )}
          {screen === 'search' && <SearchView tasks={tasks} taskActions={taskActions} onClose={goHome} />}
          {screen === 'weeks' && <AllWeeksScreen tasks={tasks} taskActions={taskActions} onBack={goHome} />}
          {form && <TaskForm task={form.task} defaultDate={form.date} onSubmit={handleSubmit} onClose={closeForm} />}
        </>
      )}
    </div>
  );
}
