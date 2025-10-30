// Gemini AI Service for Product Recommendations
// Note: You need to add your Gemini API key in a .env file or config

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const getProductRecommendations = async (cartItems, allProducts) => {
  try {
    // Create a prompt based on cart items
    const cartCategories = [...new Set(cartItems.map(item => item.category))];
    const cartTitles = cartItems.map(item => item.title).join(', ');
    
    const prompt = `Based on a customer who purchased these products: ${cartTitles} in categories: ${cartCategories.join(', ')}, 
    recommend 3 similar or complementary products from this list: ${allProducts.map(p => `${p.title} (${p.category})`).join(', ')}. 
    Return only the product titles as a comma-separated list, no explanations.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations from Gemini');
    }

    const data = await response.json();
    const recommendationText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse recommendations and match with actual products
    const recommendedTitles = recommendationText.split(',').map(t => t.trim());
    const recommendations = allProducts.filter(product => 
      recommendedTitles.some(title => product.title.toLowerCase().includes(title.toLowerCase()))
    ).slice(0, 3);

    return recommendations;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    // Fallback to simple recommendation logic
    return getFallbackRecommendations(cartItems, allProducts);
  }
};

// Fallback recommendation logic when AI is not available
const getFallbackRecommendations = (cartItems, allProducts) => {
  if (cartItems.length === 0) {
    // Return top-rated products
    return allProducts
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 3);
  }

  // Get categories from cart
  const cartCategories = [...new Set(cartItems.map(item => item.category))];
  const cartProductIds = cartItems.map(item => item.id);

  // Find products in same categories, excluding cart items
  const recommendations = allProducts
    .filter(product => 
      cartCategories.includes(product.category) && 
      !cartProductIds.includes(product.id)
    )
    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    .slice(0, 3);

  // If not enough recommendations, add top-rated products
  if (recommendations.length < 3) {
    const additionalProducts = allProducts
      .filter(product => !cartProductIds.includes(product.id))
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 3 - recommendations.length);
    
    recommendations.push(...additionalProducts);
  }

  return recommendations;
};

export const getProductDescription = async (product) => {
  try {
    const prompt = `Write a compelling, short marketing description (2-3 sentences) for this product: 
    ${product.title} in the ${product.category} category. Price: $${product.price}. 
    Make it engaging and highlight key benefits.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate description');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || product.description;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return product.description;
  }
};

export const getSmartSearchSuggestions = async (query, products) => {
  try {
    const productList = products.map(p => p.title).join(', ');
    const prompt = `Given this search query: "${query}", suggest 3 relevant product search terms from this list: ${productList}. 
    Return only the terms as a comma-separated list.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get suggestions');
    }

    const data = await response.json();
    const suggestions = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return suggestions.split(',').map(s => s.trim()).filter(s => s);
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return [];
  }
};
