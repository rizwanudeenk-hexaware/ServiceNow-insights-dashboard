import { ReactElement } from 'react';
import { IconButton, Stack, SxProps } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useRefresh } from 'context/RefreshContext';
import LanguageMenu from './LanguageMenu';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggler from './ThemeToggler';

interface AppbarActionItemsProps {
  sx?: SxProps;
  searchComponent?: ReactElement;
}

const AppbarActionItems = ({ sx, searchComponent }: AppbarActionItemsProps) => {
  const { triggerRefresh } = useRefresh();
  return (
    <Stack
      className="action-items"
      spacing={1}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      <IconButton color="inherit" onClick={triggerRefresh}>
        <IconifyIcon icon="material-symbols:refresh" />
      </IconButton>
      {searchComponent}
      <LanguageMenu />
      <ThemeToggler />
      <NotificationMenu />
      <ProfileMenu />
    </Stack>
  );
};

export default AppbarActionItems;
