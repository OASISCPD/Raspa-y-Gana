import React from 'react';
import { PageHome } from './Pages/PageHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageTermsAndConditions } from './Pages/PageTermsAndConditions';
import { PageTemplateMinorAge } from './Pages/PageTemplateMinorAge';
import { PageHowToGet } from './Pages/PageHowToGet';
import { PageAlreadyPlayed } from './Pages/PageAlreadyPlayed';
import { PageTest } from './Pages/PageTest';
const App: React.FC = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PageHome />} />
          <Route path='/terms' element={<PageTermsAndConditions />} />
          <Route path='/howToGet' element={<PageHowToGet />} />
          <Route path='/minorAge' element={<PageTemplateMinorAge />} />
          <Route path='/alreadyPlayed' element={<PageAlreadyPlayed />} />

          <Route path='/test' element={<PageTest />} />
          {/*  <Route path='/test' element={<TemplateScratch/>} /> */}
        </Routes>
        {/*  <Footer/> */}
      </Router>
    </>

  );
};

export default App;
