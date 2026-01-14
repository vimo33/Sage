const { withEntitlementsPlist } = require('expo/config-plugins');

/**
 * Config plugin that removes the Push Notifications entitlement.
 * This is needed because personal development teams don't support push notifications,
 * but expo-notifications adds the entitlement by default.
 */
function withRemovePushEntitlement(config) {
  return withEntitlementsPlist(config, (config) => {
    // Remove the aps-environment entitlement
    if (config.modResults['aps-environment']) {
      delete config.modResults['aps-environment'];
      console.log('[withRemovePushEntitlement] Removed aps-environment entitlement');
    }
    return config;
  });
}

module.exports = withRemovePushEntitlement;
