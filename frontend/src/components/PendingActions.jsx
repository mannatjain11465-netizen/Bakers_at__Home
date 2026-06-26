function PendingActions({
    inquiryOrders,
    pendingPayments
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

            </div>
        </>
    );
}

export default PendingActions;