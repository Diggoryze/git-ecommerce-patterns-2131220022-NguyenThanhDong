import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.

        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        const isStockAvailable = this.inventoryService.checkStock(orderDetails.productIds);
        if (!isStockAvailable) {
            console.log("Checkout failed: Products are out of stock.");
            return;
        }
        console.log("Step 1: Products are in stock.");

        // 2. If they are, process the payment using `paymentService.processPayment()`.
        const isPaymentSuccessful = this.paymentService.processPayment(orderDetails.userId);
        if (!isPaymentSuccessful) {
            console.log("Checkout failed: Payment was not successful.");
            return;
        }
        console.log("Step 2: Payment processed successfully.");

        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        const isShippingArranged = this.shippingService.arrangeShipping(orderDetails.shippingAddress);
        if (isShippingArranged === false) {
            console.log("Checkout failed: Could not arrange shipping.");
            return;
        }
        console.log("Step 3: Shipping arranged successfully.");

        // 4. Log the result of each step. If a step fails, log it and stop.
        console.log("Order completely placed successfully!");

    }
}

export { CheckoutFacade };
