import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import ViewStudent from './pages/ViewStudent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/:id" element={<ViewStudent />} />
          <Route path="students/:id/edit" element={<EditStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
