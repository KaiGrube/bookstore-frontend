import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken} from "../../_store/slice/authSlice.js";

export default function UserDetails() {

  const {userId} = useParams();
  const token = useSelector(selectToken);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    console.log(userId)
    async function fetchUser() {
      const config = {
        url: `http://localhost:3001/users/${userId}`,
        method: 'get',
        headers: { "Authorization": token },
        validateStatus: status => true,
      }
      const response = await axios(config);
      if (response.status === 200) {
        setUser(response.data.user);
      }
    }
    fetchUser();
  }, [userId, token])

  return (
    <div className='User'>
      { user !== undefined &&
        <div>
          <h2>User</h2>
          <div>First name: {user.firstName}</div>
          <div>Last name: {user.lastName}</div>
          <div>Street: {user.street}</div>
          <div>Zip Code: {user.zipCode}</div>
          <div>City: {user.city}</div>
        </div>
      }
    </div>
  )
}
