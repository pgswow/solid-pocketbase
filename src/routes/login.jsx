import { pb } from "~/components/pb";
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  if (pb.authStore.isValid) {
    navigate("/user");
  }

  async function userLogin(e) {
    e.preventDefault();
    try {
      const authData = await pb.collection("users").authWithPassword(email(), password());

      if (authData) {
        navigate("/user", { replace: true });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div class="flex bg-slate-300 border items-center justify-center w-screen h-screen">
      <div class="flex flex-col w-1/3 bg-white rounded-xl p-5">
        <form onSubmit={(e) => userLogin(e)} method="post">
          <label class="flex flex-col">
            Email:
            <input onInput={(e) => setEmail(e.target.value)} type="email" name="email" class="border p-2 rounded-xl" />
          </label>

          <label class="flex flex-col mt-4">
            Password:
            <input onInput={(e) => setPassword(e.target.value)} type="password" name="password" class="border p-2 rounded-xl" />
          </label>
          <button type="submit" class="rounded-xl p-2 bg-blue-600 text-white mt-5 w-full">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
