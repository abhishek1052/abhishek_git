import React from "react";
import Profilepic from "./components/Profilepic";
import Username from "./components/Username";
import Description from "./components/Description";
import Repo from "./components/Repo";
import { useEffect } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
function App() {
  const [username, changeUsername] = React.useState("");
  const [isloading, loadingstatus] = React.useState(true);
  const [repos, changerepos] = React.useState([]);
  const [repoCount, setRepoCount] = React.useState(0);
  const [controller, setController] = React.useState({
    page: 0,
    rowsPerPage: 10
  });
  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0

    });
  };

  useEffect(() => {
    const getData = async () => {
      var page = controller.page;
      page++;
      var url = "https://api.github.com/users/" + username + "/repos?page=" + page + "&per_page=" + controller.rowsPerPage;
      if (username !== "") {
        try {
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
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [controller, username]);

  useEffect(() => {
    const getData = async () => {
      var url = "https://api.github.com/users/" + username;
      if (username !== "") {
        try {
          fetch(url)
            .then((response) => response.json())
            .then(

              function (data) {
                setRepoCount(data.public_repos)
              }
            )
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [username]);


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

              <Card>
                <Table>
                  <TableHead>

                  </TableHead>
                  <TableBody>
                    {
                      repos.map((e, index) => {
                        return <TableRow key={index}>
                          <TableCell key={index}>
                            <Repo key={index} name={e.name} description={e.description} user={username} />
                          </TableCell>
                        </TableRow>
                      })

                    }

                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  onPageChange={handlePageChange}
                  page={controller.page}
                  count={repoCount}
                  rowsPerPage={controller.rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>

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