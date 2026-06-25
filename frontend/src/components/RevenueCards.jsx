function RevenueCards({
    totalRevenue,
    revenueReceived,
    pendingPayments
}) {

    return (
        <>
            <h2>Revenue</h2>

            <div>

                <div>
                    <h3>Total Revenue</h3>
                    <p>₹{totalRevenue}</p>
                </div>

                <hr />

                <div>
                    <h3>Revenue Received</h3>
                    <p>₹{revenueReceived}</p>
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

export default RevenueCards;