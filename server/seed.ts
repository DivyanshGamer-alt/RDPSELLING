import { db } from './db';
import { products, users } from '@shared/schema';
import { eq } from 'drizzle-orm';

const productData = [
  {
    name: "Low Plan",
    description: "Perfect for basic browsing, automation, and light tasks",
    price: "3.00",
    priceINR: "220.00",
    category: "rdp",
    specifications: {
      ram: "2GB",
      cpu: "2 Cores",
      storage: "40GB SSD",
      os: "Windows 10/11"
    },
    features: ["2GB RAM", "2 CPU Cores", "40GB SSD", "24/7 Support", "30 Days Warranty", "Full Admin Access"]
  },
  {
    name: "Basic Plan",
    description: "Ideal for general use with more resources",
    price: "6.00",
    priceINR: "440.00",
    category: "rdp",
    specifications: {
      ram: "4GB",
      cpu: "2 Cores",
      storage: "50GB SSD",
      os: "Windows 10/11"
    },
    features: ["4GB RAM", "2 CPU Cores", "50GB SSD", "Windows 10/11", "Full Admin Access"]
  },
  {
    name: "Standard Plan",
    description: "Perfect for trading, editing, and advanced automation",
    price: "8.00",
    priceINR: "700.00",
    category: "rdp",
    specifications: {
      ram: "8GB",
      cpu: "4 Cores",
      storage: "100GB SSD",
      os: "Windows 10/11"
    },
    features: ["8GB RAM", "4 CPU Cores", "100GB SSD", "High Speed", "30 Days Warranty", "Windows 10/11"]
  },
  {
    name: "Pro Plan",
    description: "High performance for demanding applications",
    price: "13.00",
    priceINR: "1000.00",
    category: "rdp",
    specifications: {
      ram: "16GB",
      cpu: "4 Cores",
      storage: "120GB SSD",
      os: "Windows 10/11"
    },
    features: ["16GB RAM", "4 CPU Cores", "120GB SSD", "Windows 10/11", "High Speed"]
  },
  {
    name: "Pro Max Plan",
    description: "Maximum performance for professional workloads",
    price: "23.00",
    priceINR: "2000.00",
    category: "vps",
    specifications: {
      ram: "32GB",
      cpu: "8 Cores",
      storage: "120GB SSD",
      os: "Windows 10/11"
    },
    features: ["32GB RAM", "8 CPU Cores", "120GB SSD", "Windows 10/11", "High Speed"]
  },
  {
    name: "Ultra Plan",
    description: "Ultimate power for heavy-duty professional tasks",
    price: "43.00",
    priceINR: "4000.00",
    category: "vps",
    specifications: {
      ram: "64GB",
      cpu: "16 Cores",
      storage: "250GB SSD",
      os: "Windows 10/11"
    },
    features: ["64GB RAM", "16 CPU Cores", "250GB SSD", "Super Performance", "30 Days Warranty", "Windows 10/11"]
  }
];

const ownerData = {
  id: 'owner-admin',
  email: 'fxpl.hi2@gmail.com',
  firstName: 'Star',
  lastName: 'Owner',
  profileImageUrl: null,
  isAdmin: true
};

async function seed() {
  try {
    console.log('Seeding database...');
    
    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length === 0) {
      console.log('Adding products...');
      await db.insert(products).values(productData);
      console.log(`Added ${productData.length} products`);
    } else {
      console.log(`${existingProducts.length} products already exist`);
    }
    
    // Ensure owner admin user exists
    const existingOwner = await db.select().from(users).where(eq(users.email, ownerData.email));
    
    if (existingOwner.length === 0) {
      console.log('Creating owner admin user...');
      await db.insert(users).values(ownerData);
      console.log('Owner admin user created');
    } else {
      console.log('Owner admin user already exists');
      // Update to ensure admin privileges
      await db.update(users)
        .set({ isAdmin: true })
        .where(eq(users.email, ownerData.email));
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();