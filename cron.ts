import type { Context, ScheduledEvent } from 'aws-lambda';


type Order = {
    id: string;
    // other order properties
};



class Service  {
    getNewOrdersFromLastRequest(): Order[] {
        // some. logic to get new orders from last request
        return []
    }


    sendRequestToAnotherLambdaToCreatePdf(orders: Order[]): Promise<Response> {
        return fetch('https://another-lambda-endpoint.com/create-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orders: orders }),
        });
    }
}


// runs every 1 minute (cron expression: 0 * * * * ?)
export const handler = async (event: ScheduledEvent, context: Context) => {
    const service = new Service();
    const newOrders = service.getNewOrdersFromLastRequest();

    if (newOrders.length === 0) {
        return;
    }

    const pushPromises = newOrders.map(order => service.sendRequestToAnotherLambdaToCreatePdf([order]));

    await Promise.all(pushPromises);
};
