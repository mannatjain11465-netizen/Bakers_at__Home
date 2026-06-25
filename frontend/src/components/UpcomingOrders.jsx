function UpcomingOrders({ orders }) {

    return (
        <>
            <h2>Upcoming Orders</h2>

            {
                orders.length === 0 ? (

                    <p>No upcoming orders.</p>

                ) : (

                    orders.map((order) => (

                        <div key={order._id}>

                            <h3>{order.occasion}</h3>

                            <p>
                                Customer : {order.customer.name}
                            </p>

                            <p>
                                Delivery Date :{" "}
                                {new Date(order.deliveryDate).toLocaleDateString()}
                            </p>

                            <p>
                                Delivery Time : {order.deliveryTime}
                            </p>

                            <p>
                                Amount : ₹{order.payment.totalAmount}
                            </p>

                            <p>
                                Status : {order.status}
                            </p>

                            <hr />

                        </div>

                    ))

                )
            }

        </>
    );

}

export default UpcomingOrders;