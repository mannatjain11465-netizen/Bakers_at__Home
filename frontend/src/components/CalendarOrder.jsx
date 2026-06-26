function CalendarOrders({ selectedOrders, selectedDate }) {
    return (
        <>
            <hr />

            <h2>
                Orders for{" "}
                {selectedDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}
            </h2>

            {selectedOrders.length === 0 ? (

                <p>No orders for this date.</p>

            ) : (

                selectedOrders.map((order) => (

                    <div key={order._id}>

                        <h3>{order.occasion}</h3>

                        <p>
                            <strong>Item :</strong> {order.items[0].name}
                        </p>

                        <p>
                            <strong>Customer :</strong> {order.customer.name}
                        </p>

                        <p>
                            <strong>Delivery Time :</strong> {order.deliveryTime}
                        </p>

                        <p>
                            <strong>Status :</strong> {order.status}
                        </p>

                        <hr />

                    </div>

                ))

            )}
        </>
    );
}

export default CalendarOrders;