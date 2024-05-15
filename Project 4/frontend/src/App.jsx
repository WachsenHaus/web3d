import { RecoilRoot } from 'recoil';
import ClientSocketControls from './components/utilComponents/ClientSocketControls';
import { Content } from './components/content/content';

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControls />
    </RecoilRoot>
  );
}

export default App;
