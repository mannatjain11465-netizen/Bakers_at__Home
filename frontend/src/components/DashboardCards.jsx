function DashboardCards({
    totalCustomers,
    totalOrders,
    activeOrders,
    completedOrders
}) {

    return (
        <>
            <h2>Overview</h2>

            <div>

                <div>
                    <h3>Total Customers</h3>
                    <p>{totalCustomers}</p>
                </div>

                <hr />

                <div>
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>

                <hr />

                <div>
                    <h3>Active Orders</h3>
                    <p>{activeOrders}</p>
                </div>

                <hr />

                <div>
                    <h3>Completed Orders</h3>
                    <p>{completedOrders}</p>
                </div>

            </div>
        </>
    );
}

export default DashboardCards;