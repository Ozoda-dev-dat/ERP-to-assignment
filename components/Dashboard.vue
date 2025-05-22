<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full mr-4" :class="stat.bgColor">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm text-gray-500">{{ stat.name }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Revenue Chart -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Revenue Overview</h2>
        <div class="h-64">
          <div class="flex h-full items-end">
            <div 
              v-for="(item, index) in data.finances.monthlyRevenue" 
              :key="index"
              class="flex-1 mx-1 bg-primary hover:bg-primary-dark transition-all duration-200"
              :style="{ height: `${(item.revenue / maxRevenue) * 100}%` }"
            >
              <div class="h-full relative group">
                <div class="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1 transition-opacity duration-200">
                  ${{ item.revenue.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-500">
          <span v-for="(item, index) in data.finances.monthlyRevenue" :key="index">
            {{ item.month }}
          </span>
        </div>
      </div>
      
      <!-- Order Status Chart -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Order Status</h2>
        <div class="flex justify-center items-center h-64">
          <div class="grid grid-cols-2 gap-4 w-full">
            <div v-for="(status, index) in orderStatusCounts" :key="index" class="flex flex-col items-center">
              <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  class="h-4 rounded-full" 
                  :class="statusColors[status.status]"
                  :style="{ width: `${(status.count / data.orders.length) * 100}%` }"
                ></div>
              </div>
              <div class="text-sm text-gray-600">{{ status.status }}: {{ status.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Orders -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Recent Orders</h2>
        <button @click="currentView = 'Orders'" class="text-primary text-sm hover:underline">View All</button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in recentOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.orderNumber }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.customerName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ order.total.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Low Stock Alert -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Low Stock Alert</h2>
        <button @click="currentView = 'Inventory'" class="text-primary text-sm hover:underline">View Inventory</button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in lowStockProducts" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ product.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.sku }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.reorderLevel }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-primary hover:underline">Reorder</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { 
  UsersIcon, ShoppingCartIcon, 
  PackageIcon, CreditCardIcon 
} from 'lucide-vue-next';

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// Emits
const emit = defineEmits(['update-data']);

// Computed
const stats = computed(() => [
  { 
    name: 'Total Customers', 
    value: props.data.customers.length, 
    icon: UsersIcon,
    bgColor: 'bg-blue-500'
  },
  { 
    name: 'Total Orders', 
    value: props.data.orders.length, 
    icon: ShoppingCartIcon,
    bgColor: 'bg-green-500'
  },
  { 
    name: 'Products', 
    value: props.data.products.length, 
    icon: PackageIcon,
    bgColor: 'bg-purple-500'
  },
  { 
    name: 'Revenue', 
    value: `$${props.data.finances.totalRevenue.toLocaleString()}`, 
    icon: CreditCardIcon,
    bgColor: 'bg-yellow-500'
  }
]);

const recentOrders = computed(() => {
  return [...props.data.orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
});

const lowStockProducts = computed(() => {
  return props.data.products
    .filter(product => product.stock <= product.reorderLevel)
    .slice(0, 5);
});

const orderStatusCounts = computed(() => {
  const statusMap = props.data.orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(statusMap).map(([status, count]) => ({
    status,
    count
  }));
});

const maxRevenue = computed(() => {
  if (!props.data.finances.monthlyRevenue.length) return 0;
  return Math.max(...props.data.finances.monthlyRevenue.map(item => item.revenue));
});

// Status colors
const statusColors = {
  'Pending': 'bg-yellow-500',
  'Processing': 'bg-blue-500',
  'Shipped': 'bg-purple-500',
  'Delivered': 'bg-green-500',
  'Cancelled': 'bg-red-500'
};

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Processing': return 'bg-blue-100 text-blue-800';
    case 'Shipped': return 'bg-purple-100 text-purple-800';
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>
