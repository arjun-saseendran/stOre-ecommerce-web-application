import React from 'react'
import UserHeader from './pages/user/UserHeader'
import Banner from './components/Banner';

function App() {
  return (
    <div>
      <header>
        <UserHeader />
      </header>

      <section>
        <Banner/>
      </section>
    </div>
  );
}

export default App