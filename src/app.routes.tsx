import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      {/* PRIVATE */}
      <Route path="/public/*" element={<div>public page</div>} />

      {/* PRIVATE */}
      <Route path="/private/*" element={<div>private page</div>} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/default-page" />} />
    </Routes>
  );
};
export default AppRoutes;
