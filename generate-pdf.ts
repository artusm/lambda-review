import type { APIGatewayProxyEvent, Context } from 'aws-lambda';


// Average response time for generating a PDF using an external service is 1 seconds per PDF.
class ExternalServiceToGeneratePdf {
    // Generate PDF from HTML content using an external service
    generatePdf(htmlContent: string) {}

    // Generate PDF from multiple HTML contents in batch using an external service
    generatePdfBatch(htmlContents: string[]) {}
}

class S3Service {
    savePdfToS3(orderId: string, pdfBlob: unknown): void {
        // upload the PDF to S3 here.
    }
}


export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    const { orders } = JSON.parse(event.body!);

    const pdfService = new ExternalServiceToGeneratePdf();
    const s3 = new S3Service();

    for (const order of orders) {
        const htmlContent = `<html><body><h1>Order ID: ${order.id}</h1></body></html>`;
       
        const pdfBlob = pdfService.generatePdf(htmlContent);


        s3.savePdfToS3(order.id, pdfBlob);
    }
};
