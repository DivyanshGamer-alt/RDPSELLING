import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertProductSchema, insertOrderSchema, insertCartItemSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "demo@example.com",
    pass: process.env.SMTP_PASS || "demo-password"
  }
});

// Mock payment processing functions
async function processRazorpayPayment(amount: number, orderId: string) {
  // Mock Razorpay integration
  return {
    success: true,
    paymentId: `razorpay_${Date.now()}`,
    status: "paid"
  };
}

async function processCryptoPayment(amount: number, orderId: string) {
  // Mock crypto payment integration
  return {
    success: true,
    paymentId: `crypto_${Date.now()}`,
    cryptoAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    status: "paid"
  };
}

async function sendOrderConfirmationEmail(order: any, userEmail: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || "fxpl.hi2@gmail.com",
      to: userEmail,
      subject: `Order Confirmation - ${order.id}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order! Your order ${order.id} has been confirmed.</p>
        <p><strong>Total: $${order.total}</strong></p>
        <p>Your server will be provisioned within 60 seconds.</p>
        <p><strong>🇸🇹🇦🇷 X OWNER ️ 👁️‍🗨️ Support:</strong></p>
        <p>📧 Email: fxpl.hi2@gmail.com</p>
        <p>📞 Phone: +91 9142292490</p>
        <p>📱 Telegram: @XSTARxOWNER</p>
        <p>💬 WhatsApp: https://wa.me/919142292490</p>
      `
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Products routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post('/api/products', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.delete('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Cart routes
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        userId
      });
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.delete('/api/cart/:productId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.removeFromCart(userId, req.params.productId);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders routes
  app.get('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      let orders;
      
      if (user?.isAdmin) {
        orders = await storage.getOrders();
      } else {
        orders = await storage.getUserOrders(req.user.claims.sub);
      }
      
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get('/api/orders/:id', isAuthenticated, async (req: any, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin && order.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId,
        customerEmail: user?.email
      });

      // Create order
      const order = await storage.createOrder(orderData);

      // Process payment based on method
      let paymentResult;
      if (orderData.paymentMethod === 'razorpay') {
        paymentResult = await processRazorpayPayment(parseFloat(orderData.total), order.id);
      } else if (orderData.paymentMethod === 'crypto') {
        paymentResult = await processCryptoPayment(parseFloat(orderData.total), order.id);
      }

      if (paymentResult?.success) {
        // Update order with payment info
        const updatedOrder = await storage.updateOrderStatus(order.id, 'completed');
        
        // Clear cart
        await storage.clearCart(userId);
        
        // Send confirmation email
        if (user?.email) {
          await sendOrderConfirmationEmail(updatedOrder, user.email);
        }
        
        res.status(201).json({
          ...updatedOrder,
          paymentId: paymentResult.paymentId,
          cryptoAddress: paymentResult.cryptoAddress
        });
      } else {
        await storage.updateOrderStatus(order.id, 'failed');
        res.status(400).json({ message: "Payment processing failed" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.patch('/api/orders/:id/status', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Initialize default products
  app.post('/api/admin/seed', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const defaultProducts = [
        {
          name: "Low Plan",
          description: "Perfect for basic browsing, automation, and light tasks",
          price: "3.00",
          priceINR: "220.00",
          category: "rdp",
          specifications: {
            ram: "2GB",
            cpu: "2 CPU Cores",
            storage: "40GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "Private & Secure", "30 Days Warranty"]
        },
        {
          name: "Basic Plan",
          description: "Great for YouTube, coding, and standard automation tasks",
          price: "6.00",
          priceINR: "440.00",
          category: "rdp",
          specifications: {
            ram: "4GB",
            cpu: "2 CPU Cores",
            storage: "50GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "Private & Secure", "30 Days Warranty"]
        },
        {
          name: "Standard Plan",
          description: "Perfect for trading, editing, and advanced automation",
          price: "8.00",
          priceINR: "700.00",
          category: "rdp",
          specifications: {
            ram: "8GB",
            cpu: "4 CPU Cores",
            storage: "100GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "High Speed", "30 Days Warranty"]
        },
        {
          name: "Pro Plan",
          description: "High-performance solution for demanding applications",
          price: "13.00",
          priceINR: "1000.00",
          category: "rdp",
          specifications: {
            ram: "16GB",
            cpu: "4 CPU Cores",
            storage: "120GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "High Speed", "30 Days Warranty"]
        },
        {
          name: "Pro Max Plan",
          description: "Premium performance for professional workflows",
          price: "23.00",
          priceINR: "2000.00",
          category: "rdp",
          specifications: {
            ram: "32GB",
            cpu: "8 CPU Cores",
            storage: "120GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "High Speed", "30 Days Warranty"]
        },
        {
          name: "Ultra Plan",
          description: "Ultimate power for heavy-duty professional tasks",
          price: "43.00",
          priceINR: "4000.00",
          category: "rdp",
          specifications: {
            ram: "64GB",
            cpu: "16 CPU Cores",
            storage: "250GB SSD",
            os: "Windows 10/11"
          },
          features: ["24/7 Support", "Full Admin Access", "Super Performance", "30 Days Warranty"]
        }
      ];

      const createdProducts = [];
      for (const productData of defaultProducts) {
        try {
          const product = await storage.createProduct(productData);
          createdProducts.push(product);
        } catch (error) {
          console.log("Product may already exist, skipping...");
        }
      }

      res.json({ message: "Products seeded successfully", products: createdProducts });
    } catch (error) {
      console.error("Error seeding products:", error);
      res.status(500).json({ message: "Failed to seed products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
