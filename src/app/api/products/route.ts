import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('q');
  const location = searchParams.get('location') || 'Richardson, TX';

  if (!searchTerm || !searchTerm.trim()) {
    return NextResponse.json({ error: 'Search term is required.' }, { status: 400 });
  }

  const API_KEY = process.env.SEARCHAPI_IO_API_KEY;
  const url = 'https://www.searchapi.io/api/v1/search';

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not found. Please set SEARCHAPI_IO_API_KEY in your environment variables.' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(url, {
      params: {
        engine: 'google_shopping',
        api_key: API_KEY,
        q: searchTerm,
        location: location,
        gl: 'us',
        hl: 'en',
        tbs: 'mr:1,local_avail:1,ss:55',
      },
    });

    const data = response.data;

    let items = [];
    if (data && data.shopping_results && data.shopping_results.length > 0) {
      const products = data.shopping_results.map((item: any) => {
        let price = 0;
        if (item.extracted_price !== undefined) {
          price = item.extracted_price;
        } else if (item.price) {
          const priceMatch = item.price.match(/[\d,\.]+/);
          if (priceMatch) {
            price = parseFloat(priceMatch[0].replace(/,/g, ''));
          }
        }
        let distance = null;
        if (item.distance) {
          distance = parseFloat(item.distance.replace(/[^\d\.]/g, ''));
        }

        return {
          id: item.product_id || item.position,
          title: item.title ? item.title.trim() : 'No title available',
          price: price || 0,
          seller: item.seller || 'Unknown seller',
          link: item.link,
          product_link: item.product_link,
          thumbnail: item.thumbnail || '/placeholder-image.png',
          rating: item.rating !== undefined ? item.rating : null,
          reviews: item.reviews !== undefined ? item.reviews : null,
          distance: distance,
        };
      });

      // Filter out products without valid price and rating
      const filteredProducts = products.filter(
        (product) => product.price > 0 && product.rating !== null && product.distance !== null
      );

      // Sort the filtered products by price in ascending order
      const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);

      // Take the cheapest 5 products
      items = sortedProducts.slice(0, 5);
    }

    return NextResponse.json({ items, searchTerm, location });
  } catch (error: any) {
    console.error('Error fetching data from SearchAPI.io:', error.message);
    console.error('Error details:', error.response?.data);
    return NextResponse.json(
      { error: 'Error fetching data from SearchAPI.io', details: error.response?.data },
      { status: 500 }
    );
  }
}
