/* ─── Order persistence (localStorage) ─── */

export interface OrderItem {
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDesign {
  forma: string;
  longitud: string;
  diametro: string;
  elasticidad: string;
  flujo: string;
  color: string;
  tamaño: string;
}

export interface Order {
  id: string;
  email: string;
  nombre: string;
  items: OrderItem[];
  total: number;
  date: string;
  design?: OrderDesign;
  designConfirmed: boolean;
}

const STORAGE_KEY = "happymami_orders";
const CURRENT_KEY = "happymami_current_order";

function generateOrderId(): string {
  const prefix = "HM";
  const num = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${num}`;
}

function getAll(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(email: string, nombre: string, items: OrderItem[], total: number): Order {
  const order: Order = {
    id: generateOrderId(),
    email,
    nombre,
    items,
    total,
    date: new Date().toISOString(),
    designConfirmed: false,
  };
  const orders = getAll();
  orders.push(order);
  save(orders);
  localStorage.setItem(CURRENT_KEY, order.id);
  return order;
}

export function findOrder(orderId: string, email: string): Order | null {
  const orders = getAll();
  return orders.find((o) => o.id === orderId && o.email.toLowerCase() === email.toLowerCase()) || null;
}

export function attachDesign(orderId: string, design: OrderDesign): boolean {
  const orders = getAll();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return false;
  orders[idx].design = design;
  orders[idx].designConfirmed = true;
  save(orders);
  return true;
}

export function getCurrentOrderId(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}

export function getOrder(orderId: string): Order | null {
  const orders = getAll();
  return orders.find((o) => o.id === orderId) || null;
}
