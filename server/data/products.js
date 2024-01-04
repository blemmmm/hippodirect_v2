const Typesense = require('typesense');
const products = require('./ecommerce.json');

const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
      port: '8108', // For Typesense Cloud use 443
      protocol: 'http', // For Typesense Cloud use https
    },
  ],
  apiKey: 'xyz',
  connectionTimeoutSeconds: 2,
});

const productsSchema = {
  name: 'products',
  num_documents: 0,
  fields: [
    {
      name: 'name',
      type: 'string',
      facet: false,
    },
    {
      name: 'description',
      type: 'string',
      facet: false,
    },
    {
      name: 'brand',
      type: 'string',
      facet: true,
    },
    {
      name: 'categories',
      type: 'string[]',
      facet: true,
    },
    {
      name: 'price',
      type: 'float',
      facet: true,
    },
    {
      name: 'image',
      type: 'string',
      facet: false,
    },
    {
      name: 'popularity',
      type: 'int32',
      facet: false,
    },
  ],
  default_sorting_field: 'popularity',
};

console.log('Populating index in Typesense');

process.nextTick(async () => {
  try {
    const collection = await client.collections('products').retrieve();
    console.log('Found existing schema');
    console.log(collection.num_documents, products.length);
    // console.log(JSON.stringify(collection, null, 2));
    if (
      collection.num_documents !== products.length ||
      collection.num_documents === products.length
    ) {
      console.log('Deleting existing schema');
      await client.collections('products').delete();
    }
  } catch (err) {
    console.log(err);
  }

  try {
    console.log('creating schema..');
    await client.collections().create(productsSchema);
    console.log(JSON.stringify(productsSchema, null, 2));
    console.log('Adding records... ');
    const data = await client.collections('products').documents().import(products);
    console.log(data);
    console.log('Done indexing.');
  } catch (err) {
    console.log(err);
  }
});
