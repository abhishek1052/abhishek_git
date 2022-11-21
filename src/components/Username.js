import React from 'react'

const Username = (props) => {
    const [user, changeuser] = React.useState("");
    function changeUser(event) {
        changeuser(event.target.value)
        props.isloading(true)
    }
    function onclick() {
        props.user(user);
        function loader() {
            props.isloading(false)
        }
        setTimeout(loader, 500);

    }
    return (
        <>
            <div className='username'>
                <input type="text" onChange={changeUser} className='center' placeholder="Enter the Username" />
                <button className="button accept-button" id="accept-button" onClick={onclick} >Submit</button>
            </div>
        </>

    )
}

export default Username