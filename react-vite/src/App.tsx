import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useSettingsContext } from 'providers/SettingsProvider';
import { REFRESH } from 'reducers/SettingsReducer';
import SettingPanelToggler from 'components/settings-panel/SettingPanelToggler';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import { RefreshProvider } from 'context/RefreshContext';

const App = () => {
  const { pathname } = useLocation();
  const { configDispatch } = useSettingsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    configDispatch({ type: REFRESH });
  }, []);

  return (
    <RefreshProvider>
      <Outlet />
      <SettingsPanel />
      <SettingPanelToggler />
    </RefreshProvider>
  );
};

export default App;
