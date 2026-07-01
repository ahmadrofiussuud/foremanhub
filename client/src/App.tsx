import { useState } from 'react';
import { Navbar, Footer } from './components/layout';
import { LandingPage } from './features/landing/LandingPage';
import { Directory } from './features/directory/Directory';
import { MandorDetail } from './features/directory/MandorDetail';
import { Workspace } from './features/projects/Workspace';
import { LoginPortal } from './features/auth/LoginPortal';
import { ClientDashboard } from './features/dashboard/ClientDashboard';
import { MandorDashboard } from './features/dashboard/MandorDashboard';

function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [userRole, setUserRole] = useState<'client' | 'mandor'>('client');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentView('landing');
        }}
      />

      <main style={{ flex: 1, padding: '3rem 0', minHeight: 'calc(100vh - 350px)' }}>
        <div className="animate-fade-in">
          {currentView === 'landing' && (
            <div className="container">
              <LandingPage onViewChange={setCurrentView} />
            </div>
          )}

          {currentView === 'directory' && (
            <Directory onViewChange={setCurrentView} />
          )}

          {currentView === 'detail' && (
            <div className="container">
              <MandorDetail onViewChange={setCurrentView} isLoggedIn={isLoggedIn} />
            </div>
          )}

          {currentView === 'login' && (
            <div className="container">
              <LoginPortal
                onLoginSuccess={(role) => {
                  setUserRole(role);
                  setIsLoggedIn(true);
                  setCurrentView('dashboard');
                }}
                onCancel={() => setCurrentView('landing')}
              />
            </div>
          )}

          {currentView === 'dashboard' && (
            <div className="container">
              {isLoggedIn ? (
                userRole === 'client' ? (
                  <ClientDashboard onViewChange={setCurrentView} />
                ) : (
                  <MandorDashboard onViewChange={setCurrentView} />
                )
              ) : (
                <LoginPortal
                  onLoginSuccess={(role) => {
                    setUserRole(role);
                    setIsLoggedIn(true);
                    setCurrentView('dashboard');
                  }}
                  onCancel={() => setCurrentView('landing')}
                />
              )}
            </div>
          )}

          {currentView === 'workspace' && (
            <div className="container">
              {isLoggedIn ? (
                <Workspace onViewChange={setCurrentView} userRole={userRole} />
              ) : (
                <LoginPortal
                  onLoginSuccess={(role) => {
                    setUserRole(role);
                    setIsLoggedIn(true);
                    setCurrentView('dashboard');
                  }}
                  onCancel={() => setCurrentView('landing')}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer onViewChange={setCurrentView} />
    </>
  );
}

export default App;
