import React from "react";
import CodeBlock from "./CodeBlock";

function Docs() {
  const apiEndpoint = `https://shopify-review-api.vercel.app/api/reviews?productId?<product-id>`;
  return (
    <div className="px-6 py-12 " id="docs">
      <div>
        <h2 className="text-xl font-bold">Introduction</h2>

        <p className="text-gray-600 mt-2">
          This API server provides endpoints for managing and displaying product
          reviews on your Shopify store. Use it to fetch, submit, and moderate
          customer reviews, enhancing your store&apos;s credibility and customer
          engagement.
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">API Endpoints</h2>

        <p className="text-gray-600 mt-2">
          <span>
            1. API for get all reviews by product id
            <CodeBlock language="bash" code={apiEndpoint} />
          </span>
          <span className="mt-6">
            2. API for create review for Product and header and payload.
            <CodeBlock language="bash" code={apiEndpoint} />
            API secret
            <CodeBlock
              language="json"
              code={`{"x-api-secret": "832a239e-6909-4b10-bcf5-a69f44edaa89"}`}
            />
            payload
            <CodeBlock
              language="json"
              code={`{
  "productId": "10", 
  "customerName": "Arif Islam", 
  "rating": 4.3, 
  "comment": "Nice Pc!"
}`}
            />
          </span>
        </p>
      </div>

      <pre>
        <code>const api = useApi()</code>
      </pre>
    </div>
  );
}

export default Docs;
