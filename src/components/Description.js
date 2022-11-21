import { useState } from 'react';
const Description = (props) => {
    const [name, changename] = useState("");
    const [bio, changebio] = useState("");
    const [location, changelocation] = useState("");
    const [twitter, changetwitter] = useState("");
    var url = "https://api.github.com/users/" + props.username;

    if (props.username !== "") {
        fetch(url)
            .then((response) => response.json())
            .then(
                function (data) {
                    changename(data.name)
                    changebio(data.bio)
                    changelocation(data.location)
                    changetwitter(data.twitter_username)
                }
            )
    }
    return (
        <table className='desc' >
            <thead></thead>
            <tbody>

                <tr>
                    <td> <h1> {name}</h1>  </td>
                </tr>
                <tr>
                    <td> <h4>Bio ::</h4> {bio} </td>
                </tr>
                <tr>
                    <td> <i className="fas fa-map"></i> {location} </td>
                </tr>
                <tr>
                    <td> <h4>Twitter</h4>{twitter}  </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Description