// Busca index por defecto 
import { SurgeryProvider } from "./context/surgeryContext";
import { UserProvider } from "./context/userContext";
import { AdminPage, HomePage, LoginPage, NotFountPage, SurgeryFindPage, SurgeryFormPage, UserFindPage, UserFormPage, UsersPage,SurgeryAdminFindPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    // <div>
    <div className="bg-neutral-200 min-h-screen items-center">
      <div className="mr-10">
        <SurgeryProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AdminPage" element={<AdminPage />} />
              <Route path="/SurgeryFindPage/:id" element={<SurgeryFindPage />} />
              <Route path="/SurgeryAdminFindPage/:id" element={<SurgeryAdminFindPage />} />
              <Route path="/SurgeryFormPage" element={<SurgeryFormPage />} />
              <Route path="/SurgeryFormPage/:id" element={<SurgeryFormPage />} />
              <Route path="/UserFindPage/:id" element={<UserFindPage />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/UserFormPage" element={<UserFormPage />} />
              <Route path="/UserFormPage/:id" element={<UserFormPage />} />
              <Route path="/UsersPage" element={<UsersPage />} />
              <Route path="*" element={<NotFountPage />} />
            </Routes>
            <Toaster/>
          </UserProvider>
        </SurgeryProvider>
      </div>
    </div>

  )
}

export default App

