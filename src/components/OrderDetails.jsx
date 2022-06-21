import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readOrder} from "../_store/slice/orderSlice.js";
import {selectUser} from "../_store/slice/userSlice.js";
import ItemList from "./basket/ItemList.jsx";
import User from "./User";

export default function OrderDetails() {

  const {orderId} = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(undefined);

  useEffect( () => {
    async function fetchOrder(orderId) {
      const response = await dispatch(readOrder(orderId));
      if (response.status === 200) {
        setOrder(response.data);
      }
    }
    fetchOrder(orderId)
  }, [dispatch, orderId])

  return (
    <div className="OrderDetails">
      <h2>OrderDetails</h2>
      {order === undefined &&
        <div>Fetching order</div>
      }

      {order !== undefined &&
        <div>
          <div>Order Id: {order._id}</div>
          <ItemList isEditable={false}
                    items={order.basket.items}
          />
          <h2>Delivery Address</h2>
          <User user={user}/>
        </div>
      }
    </div>
  );
}