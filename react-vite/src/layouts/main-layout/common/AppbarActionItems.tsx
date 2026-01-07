import { ReactElement } from 'react';
import { IconButton, Stack, SxProps } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useRefresh } from 'context/RefreshContext';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface AppbarActionItemsProps {
  sx?: SxProps;
  searchComponent?: ReactElement;
}

const AppbarActionItems = ({ sx, searchComponent }: AppbarActionItemsProps) => {
  const { triggerRefresh, isRefreshing } = useRefresh();
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
      <IconButton
        color="inherit"
        onClick={triggerRefresh}
        sx={{
          animation: isRefreshing ? `${rotate} 1s linear infinite` : 'none',
        }}
      >
        <IconifyIcon icon="material-symbols:refresh" />
      </IconButton>
      {searchComponent}
    </Stack>
  );
};

export default AppbarActionItems;
