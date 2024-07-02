import { useNavigate } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";

import { pb } from "~/components/pb";

export default function User() {
  const [user, setUser] = createSignal({});
  const [auth, setAuth] = createSignal(false);
  const navigate = useNavigate();

  const logout = () => {
    pb.authStore.clear();
    navigate("/login");
  };

  const refreshAuth = async () => {
    if (!pb.authStore.isValid) {
      pb.authStore.clear();
      navigate("/login");
      setAuth(false);
      return false;
    }
    await pb.collection("users").authRefresh();
    setAuth(true);
    return true;
  };
  onMount(() => {
    refreshAuth();
    const model = pb.authStore.model;
    setUser(model);
  });

  return (
    <Show when={auth()}>
      <main class="text-center mx-auto text-gray-700 p-4">
        USER: {user().name}, ID: {user().id}
        <button onClick={() => logout()} class="p-2 border">
          LOGOUT
        </button>
      </main>
    </Show>
  );
}
