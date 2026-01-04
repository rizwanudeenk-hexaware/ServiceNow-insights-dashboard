import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Caller {
  groupby_fields:{
    display_value: string
  }[];
  stats: {
    count: string;
  };
}

interface TopCallersTableProps {
  callers: Caller[];
  loading: boolean;
}

const TopCallersTable = ({ callers, loading }: TopCallersTableProps) => {
  return (
    <Card>
      <CardHeader title="Top 5 Monthly Callers" />
      <CardContent>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {callers.map((caller, index) => (
                  <TableRow key={caller.groupby_fields[0].display_value}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{caller.groupby_fields[0].display_value}</TableCell>
                    <TableCell align="right">{caller.stats.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCallersTable;
