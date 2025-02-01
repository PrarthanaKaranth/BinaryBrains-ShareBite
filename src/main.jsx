import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import routes from './routes/Routes';
import Authprovider from './provider/Authprovider';
import ScrollToTop from "react-scroll-to-top";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Chatbot = () => {
  useEffect(() => {
    // Inject Zoho SalesIQ Chatbot Script
    const script1 = document.createElement("script");
    script1.innerHTML = `window.$zoho=window.$zoho || {}; $zoho.salesiq=$zoho.salesiq||{ready:function(){}}`;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://salesiq.zohopublic.in/widget?wc=siqbf73cdd032dc910bfc6e20ed48a0542a2b068cedda9327f365743b2fb9e88708";
    script2.defer = true;
    document.body.appendChild(script2);
  }, []);

  return null; // No UI element, just loads the chatbot
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Authprovider>
          <RouterProvider router={routes} />
        </Authprovider>
      </HelmetProvider>
      <ScrollToTop smooth width='20px' height='20px' color='#ffffff' style={{ backgroundColor: '#FA2371', padding: '11px 10px' }} />
      <Chatbot /> {/* Add Chatbot Component Here */}
    </QueryClientProvider>
  </React.StrictMode>,
);
