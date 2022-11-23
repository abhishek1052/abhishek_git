import React from 'react'
import { useEffect } from 'react'
import Languages from './Languages'
const Repo = (props) => {
  const [arr, changearr] = React.useState([]);
  var url = "https://api.github.com/repos/" + props.user + "/" + props.name + "/languages";

  useEffect(() => {
    fetch(url, {
      headers: {
        'Authorization': 'token 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',
      }
    })
      .then(response => {
        if (response.status === 404) {
          return Promise.reject('error 404');
        }
        else {
          return response.json()
        }
      })
      .then(
        function (data) {
          var arr1 = []
          Object.entries(data).forEach(([key, value]) => {
            arr1.push(key);
          });
          changearr(arr1);
        }
      ).catch(error => { console.log("error404"); })
  })


  return (
    <div className='Repo' >
      <h1>
        {props.name}
      </h1>
      <div className="alldesc">
        {props.description !== null && props.description.slice(0, 500) + "..."}
      </div>
      <div className='languages-bar'>
        {arr.map((e, index) => {
          return <Languages key={index} language={e} />
        })
        }
      </div>
    </div>
  )
}

export default Repo