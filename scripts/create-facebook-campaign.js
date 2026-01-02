
'use strict';
require('dotenv').config();
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;

// Moving credentials to environment variables for security
const access_token = process.env.FB_ACCESS_TOKEN;
const app_id = process.env.FB_APP_ID;
const ad_account_id = process.env.FB_AD_ACCOUNT_ID;
const campaign_name = process.env.FB_CAMPAIGN_NAME || 'Real Estate Lead Generation';

if (!access_token || !ad_account_id) {
  console.error('❌ Error: FB_ACCESS_TOKEN and FB_AD_ACCOUNT_ID must be set in .env');
  process.exit(1);
}

const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; 
if (showDebugingInfo) {
  api.setDebug(true);
}

void async function() {
  try {
    console.log(`🚀 Initializing Meta Campaign: ${campaign_name}`);
    
    const params = {
      'name': campaign_name,
      'objective': 'OUTCOME_TRAFFIC',
      'status': 'PAUSED',
      'special_ad_categories': ['HOUSING'], // Required for Real Estate
    };

    const campaign = await (new AdAccount(ad_account_id)).createCampaign(
      [],
      params
    );

    console.log('✅ Success! Meta Campaign ID:' + campaign.id);

  } catch(error) {
    console.error('❌ Meta API Error:', error.response?.error || error);
    process.exit(1);
  }
}();