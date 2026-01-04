import { ReactElement } from 'react';
import { IconButton, Stack, SxProps } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useRefresh } from 'context/RefreshContext';

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
    </Stack>
  );
};

export default AppbarActionItems;
