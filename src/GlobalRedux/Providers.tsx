"use client";
import { Provider } from "react-redux";
import { store } from "@/GlobalRedux/store";
import Header from "../app/component/Header";
import { QueryClientProvider, QueryClient } from "react-query";
import FooterComponent from "@/app/component/FooterComponent";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        <FooterComponent />
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
