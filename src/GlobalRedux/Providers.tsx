"use client";
import { Provider } from "react-redux";
import { store } from "@/GlobalRedux/store";
import Header from "@/components/Header";
import { QueryClientProvider, QueryClient } from "react-query";
import FooterComponent from "@/components/FooterComponent";

import Login from "@/app/(auth)/login/page";
import { useRouter } from "next/navigation";
import { GetUserfromLocalStorage } from "@/utils";

export const CheckUserLogInProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const user = GetUserfromLocalStorage();
  if (!user?.email) {
    return <Login />;
  } else {
    return children;
  }
};

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <CheckUserLogInProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <FooterComponent />
        </QueryClientProvider>
      </Provider>
    </CheckUserLogInProvider>
  );
};

export default Providers;
