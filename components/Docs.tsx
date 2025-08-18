import React from "react";
import CodeBlock from "./CodeBlock";

function Docs() {
  const apiEndpoint = `https://shopify-review-api.vercel.app/api/reviews?productId=<product-id>`;
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

        <div className="text-gray-600 mt-2">
          <span>
            1. API for fetch all reviews by product id
            <CodeBlock language="bash" code={apiEndpoint} />
            example
  
            <CodeBlock
              language="javascript"
              code={`const createReviews = async () => {
  try {
    const res = await fetch('https://shopify-review-api.vercel.app/api/reviews?productId=1234', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
        'x-api-secret': '832a239e-6909-4b10-bcf5-a69f44edaa89'
      }
    })

    const data = await res.json()

    // here data are used

  } catch (err) {
    console.log(err)
  }
}`}
    />
            
          </span>
          <div>
            2. API for fetch all reviews by shop id
            <CodeBlock
              language="bash"
              code={`https://shopify-review-api.vercel.app/api/reviews?shopId=<shop-id>`}
            />
            example
            <CodeBlock
              language="bash"
              code={`https://shopify-review-api.vercel.app/api/reviews?shopId=1234`}
            />
          </div>
          <div className="mt-8">
            3. API for create review for Product and header and payload.
            <CodeBlock language="bash" code={apiEndpoint} />
            a. API secret
            <CodeBlock
              language="json"
              code={`{"x-api-secret": "832a239e-6909-4b10-bcf5-a69f44edaa89"}`}
            />
            b .payload
            <CodeBlock
              language="json"
              code={`{"productId": "10", "customerName": "Arif Islam", "rating": 4.3, "comment": "Nice Pc!" }`}
            />
            c. Example
            <CodeBlock
              language="javascript"
              code={`const createReviews = async () => {
  try {
    const res = await fetch('https://shopify-review-api.vercel.app/api/reviews?productId=1234', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
        'x-api-secret': '832a239e-6909-4b10-bcf5-a69f44edaa89'
      },
      body: JSON.stringify({
        {
          "productId": "12",
          "shopName": "Saad Store",
          "shopId": "13",
          "customerName": "Dennis",
          "rating": 4.6,
          "title": "Good product",
          "comment": "Heavy"
        }
      
      })
    })

    const data = await res.json()

  } catch (err) {
    console.log(err)
  }
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
