import React from "react";
import Profilepic from "./components/Profilepic";
import Username from "./components/Username";
import Description from "./components/Description";
import Repo from "./components/Repo";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function App() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [username, changeUsername] = React.useState("");
  const [isloading, loadingstatus] = React.useState(true);
  const [preuser, changepre] = React.useState("");
  const [repos, changerepos] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  var url = "https://api.github.com/users/" + username + "/repos";
  if (username !== "" && username !== preuser) {
    changepre(username);
    fetch(url)
      .then((response) => response.json())
      .then(

        function (data) {

          var array = []
          for (var i = 0; i < data.length; i++) {
            array.push({
              "name": data[i].name,
              "description": data[i].description,

            })
          }
          changerepos(array);
        }
      )
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - repos.length) : 0;
  return (
    <>
      <Username user={changeUsername} isloading={loadingstatus} />
      <br />
      {username !== "" ?
        <div>

          {!isloading ? <div className="overallcontent">
            <div className="user_info" >
              <Profilepic username={username} />
              <Description username={username} />
            </div>
            <div className="allrepos" >
               <h1  >REPOSITORIES</h1> 
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  
                  <TableBody>
                    {(rowsPerPage > 0
                      ? repos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : repos
                    ).map((row, index) => (
                      <TableRow key={row.name}>
                        <TableCell style={{ width: 160 }} align="right">
                          <Repo key={[index]} name={row.name} description={row.description} user={username} />
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[2,5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={repos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </div>
            : <div className="loader"></div>
          }
        </div>
        : <div className="typewriter" >
          <h1>
            Welcome Enter the Github Username above and click Submit to view the profile.
          </h1>
        </div>
      }
    </>
  );
}
export default App;