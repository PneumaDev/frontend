import logo from './logo.png'
import hero_img from './hero_img.webp'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.webp'
import contact_img from './contact_img.webp'
import stripe_logo from './stripe_logo.png'
import mpesa_logo from "./mpesa_logo.png"
import cross_icon from './cross_icon.png'
import cash_on_delivery from "./cash-on-delivery.png"
import hero_img_2 from "./hero_img_2.webp"
import hero_img_3 from "./hero_img_3.webp"
export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    stripe_logo,
    mpesa_logo,
    cross_icon,
    cash_on_delivery,
    hero_img_2,
    hero_img_3,
}


export const shippingMethods = [
    { method: "Shop Pickup - Ronald Ngala Street", price: "FREE", region: ["Outside Nairobi"], description: "" },
    { method: "Shop Pickup - Tom Mboya Street", price: "FREE", region: ["Outside Nairobi"], description: "" },
    { method: "Door Step Delivery - Kahawa West, Kahawa Wendani", price: 400, region: ["Outside Nairobi"], description: "" },
    { method: "Door Step Delivery - Ruaka", price: 450, region: ["Within Nairobi"], description: "" },
    { method: "Door Step Delivery - Outside Nairobi", price: 590, region: ["Outside Nairobi"], description: "" },
    { method: "Door Step Delivery - Nairobi and environs", price: 300, region: ["Within Nairobi"], description: "" },
    { method: "2NK Sacco", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "4NTE Sacco", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Chania Genesis - Coast, excluding Nyali", price: 250, region: ["Outside Nairobi"], description: "" },
    { method: "Classic Shuttle", price: "FREE", region: ["Outside Nairobi"], description: "" },
    { method: "County Link", price: 150, region: ["Outside Nairobi"], description: "" },
    { method: "Dreamline - Coast", price: 400, region: ["Outside Nairobi"], description: "" },
    { method: "Easy Coach - Siaya, Bondo, Kisumu, Kakamega, Migori, Kericho", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "Ena Coach", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "G-Coach", price: 600, region: ["Outside Nairobi"], description: "" },
    { method: "Guardian", price: 250, region: ["Outside Nairobi"], description: "" },
    { method: "JPEE Travellers", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "Kaka Travellers", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "KamT Sacco", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Kijabe Line", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Kinatwa", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Kukena", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Liban", price: 600, region: ["Outside Nairobi"], description: "" },
    { method: "Libera", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "Likana", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Lopha", price: 150, region: ["Outside Nairobi"], description: "" },
    { method: "Meiso", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "Metro Trans", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "Mololine", price: 250, region: ["Outside Nairobi"], description: "" },
    { method: "MTN", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Naekana", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "Nairobi CBD", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "Narokline", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Neno", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "NNUS", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Northrift", price: 250, region: ["Outside Nairobi"], description: "" },
    { method: "Nuclear", price: 300, region: ["Outside Nairobi"], description: "" },
    { method: "Orokise", price: 150, region: ["Outside Nairobi"], description: "" },
    { method: "Pickup Mtaani (Nairobi & Nairobi Metropolitan)", price: 120, region: ["Outside Nairobi"], description: "" },
    { method: "Raha", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "Rembo Shuttle", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "Runa Sacco", price: 100, region: ["Outside Nairobi"], description: "" },
    { method: "Satima", price: 200, region: ["Outside Nairobi"], description: "" },
    { method: "South Rift", price: 250, region: ["Outside Nairobi"], region: ["Outside Nairobi"], description: "" },
    { method: "Super Metro", price: 150, region: ["Outside Nairobi", "Nairobi"], region: ["Outside Nairobi"] }
];


export const accordionItems = [
    {
        title: "How can I place an order?",
        content: "Simply browse our catalog, add the desired items to your cart, and proceed to checkout. We offer multiple payment options, including Mpesa, debit/credit cards, and other available methods.",
    },
    {
        title: "What payment methods do you accept?",
        content: "We accept a range of payment methods, including Mpesa for mobile payments, debit/credit cards, and bank transfers.",
    },
    {
        title: "Do you offer delivery across Kenya?",
        content: "Yes, we provide delivery services to all major towns and cities in Kenya. Delivery charges vary depending on your location.",
    },
    {
        title: "Can I return or exchange items?",
        content: "Yes, you may return or exchange items within 7 days of delivery, provided the item is in its original, unused condition.",
    },
    {
        title: "How long does delivery take?",
        content: "Delivery times vary based on the time of order and the shipping address, but in most cases, it will be completed within 24 hours.",
    },
    {
        title: "What should I do if my payment is not reflected in my order?",
        content: "If your payment is not reflected on the orders page, please select 'Already Paid' and verify the payment status. If the issue persists, kindly reach out to our customer support team for further assistance.",
    }
];
