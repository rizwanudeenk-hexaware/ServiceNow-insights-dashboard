import { Box, Button, Stack, paperClasses, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import AppbarActionItems from '../common/AppbarActionItems';
import SearchBox, { SearchBoxButton } from '../common/search-box/SearchBox';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router';
import { supabase } from 'supabaseClient';

const AppBar = () => {
  const {
    config: { drawerWidth },
    handleDrawerToggle,
  } = useSettingsContext();

  const { up } = useBreakpoints();
  const upSm = up('sm');
  const upMd = up('md');

  const { session } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try{
      await supabase.auth.signOut();
      alert('Signed out')
      navigate('/');
    } catch (error){
      console.log('Error signing out:', error);
    }
  };

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        borderBottom: `1px solid`,
        borderColor: 'divider',
        [`&.${paperClasses.root}`]: {
          outline: 'none',
        },
      }}
    >
      <Toolbar variant="appbar" sx={{ px: { xs: 3, md: 5 } }}>
        <Stack
          sx={{
            alignItems: 'center',
            flex: 1,
          }}
        >
          {upMd ? (
            <SearchBox
              sx={{
                width: 1,
                maxWidth: 420,
              }}
            />
          ) : (
            <SearchBoxButton />
          )}
          {session?.user?.email && (
            <Typography variant='body2' sx={{mr:2,ml:8}}>
              {session.user.email}
            </Typography>
          )}
          <AppbarActionItems />
          {session && (
            <Button color='inherit' onClick={handleSignOut} sx={{ ml: 1 }}>
              Sign Out
            </Button>
          )}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
