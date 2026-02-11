import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';

// Product interfaces
export interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    stock?: number;
    specs?: {
        carat?: string;
        clarity?: string;
        color?: string;
        cut?: string;
        metal?: string;
        [key: string]: string | undefined;
    };
    featured?: boolean;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
    const productsCol = collection(db, 'products');
    const q = query(productsCol, where('category', '==', category));
    const productSnapshot = await getDocs(q);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

// Get single product
export async function getProduct(id: string): Promise<Product | null> {
    const productDoc = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    }
    return null;
}

// Add product (Admin only)
export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
    const productsCol = collection(db, 'products');
    const docRef = await addDoc(productsCol, product);
    return docRef.id;
}

// Order interfaces
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    email: string;
}

export interface Order {
    id?: string;
    customerEmail: string;
    customerName: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'shipped' | 'cancelled' | 'return_requested' | 'refund_requested';
    reason?: string;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentId?: string;
    createdAt: any;
    updatedAt?: any;
}

// Save order
export async function createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
    const ordersCol = collection(db, 'orders');
    const orderData = {
        ...order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    };
    const docRef = await addDoc(ordersCol, orderData);
    return docRef.id;
}

// Get user orders by email
export async function getUserOrders(email: string): Promise<Order[]> {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('customerEmail', '==', email), orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);
    return orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}

// ADMIN: Get all orders
export async function getAllOrders(): Promise<Order[]> {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);
    return orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
}

// ADMIN: Get single order
export async function getOrder(orderId: string): Promise<Order | null> {
    const orderDoc = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderDoc);
    if (orderSnapshot.exists()) {
        return { id: orderSnapshot.id, ...orderSnapshot.data() } as Order;
    }
    return null;
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, {
        status,
        updatedAt: Timestamp.now()
    });
}

// ADMIN: Update product
export async function updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
    const productDoc = doc(db, 'products', productId);
    await updateDoc(productDoc, updates);
}

// ADMIN: Delete product
export async function deleteProduct(productId: string): Promise<void> {
    const productDoc = doc(db, 'products', productId);
    await deleteDoc(productDoc);
}
