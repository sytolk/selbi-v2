import Analytics from 'react-native-firebase-analytics';

export default Analytics;

export function reportShare(listingId) {
  Analytics.logEvent('share', {
    item_id: listingId,
  });
}

export function reportSignUp(method) {
  Analytics.logEvent('sign_up', {
    method,
  });
}

export function reportAddBankInfo() {
  Analytics.logEvent('add_bank_info');
}

export function reportAddPaymentInfo() {
  Analytics.logEvent('add_payment_info');
}

export function reportViewItem(listingId) {
  Analytics.logEvent('view_item', {
    item_id: listingId
  });
}

export function reportViewItemList(category) {
  Analytics.logEvent('view_item_list', {
    item_category: category,
  });
}

export function reportPurchase(price, listingId) {
  const value = 0.15 * price;

  Analytics.logEvent('ecommerce_purchase', {
    value,
    price,
    listing_id: listingId,
    currency: 'USD',
  });
}

export function reportOpenScene(sceneName, params) {
  Analytics.logEvent(`open_${sceneName}`, params);
}

export function reportButtonPress(buttonName, params) {
  Analytics.logEvent(`press_${buttonName}`, params);
}
