import ViewPage from '@/pages/home/view-page';
import { useRecoilValue } from 'recoil';
import { toastState } from '@/recoil/toast/atom';
import Sidebar from '@/components/sidebar/sidebar';
import Main from './content-container';
import Toast from './components/toast/toast';

import './App.scss';

function App() {
  const toast = useRecoilValue(toastState);
  return (
    <div className="app-container">
      <div id="toast-spot">{toast && <Toast type={toast.type}>{toast.elem}</Toast>}</div>
      <div className="layout-container">
        <Sidebar />
        <Main>
          <ViewPage />
        </Main>
      </div>
    </div>
  );
}

export default App;
