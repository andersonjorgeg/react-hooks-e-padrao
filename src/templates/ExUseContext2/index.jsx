import './styles.css';

import { AppContext } from '../../contexts/AppContext';
import { Div } from '../../components/Div/index';

export default function ExUseContext() {
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
}
