function PendingActions({
    inquiryOrders,
    pendingPayments,
    todayOrders,
    tomorrowOrders
}) {

    return (
        <>
            <h2>Pending Actions</h2>

            <div>

                <div>
                    <h3>Inquiry Orders</h3>
                    <p>{inquiryOrders}</p>
                </div>

                <hr />

                <div>
                    <h3>Pending Payments</h3>
                    <p>₹{pendingPayments}</p>
                </div>

                <hr />

                <div>
                    <h3>Today's Orders</h3>
                    <p>{todayOrders}</p>
                </div>

                <hr />

                <div>
                    <h3>Tomorrow's Orders</h3>
                    <p>{tomorrowOrders}</p>
                </div>

            </div>
        </>
    );
}

export default PendingActions;